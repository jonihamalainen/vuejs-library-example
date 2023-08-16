import { set } from "@vueuse/core";
import { Kayttaja, Kirjatiedot, Nide, Teos } from "types";

export const useSupabase = () => {
  const haeKayttaja = async (
    input: string,
    redirect: string
  ): Promise<void | boolean> => {
    const client = useSupabaseClient();
    try {
      const { data, error } = await client
        .from("asiakkaat")
        .select("*")
        .eq("asiakasnro", input)
        .single();
      if (error) throw error;
      const user = useUserState();
      user.setUserData(data);
      navigateTo("/" + redirect);
    } catch (error) {
      return true;
    }
  };
  const muokkaaKayttajaa = async (kayttaja: Kayttaja): Promise<void> => {
    const client = useSupabaseClient<Kayttaja>();
    try {
      const { data, error } = await client
        .from("asiakkaat")
        .upsert(kayttaja, { onConflict: "asiakasnro" })
        .select()
        .single();
      if (error) throw error;
      const user = useUserState();
      user.setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const lisaaLainaus = async (input: string) => {
    const client = useSupabaseClient();
    try {
      const { data, error } = await client
        .from("niteet")
        .select("*")
        .eq("nide_id", input)
        .single();
      if (error) throw error;
      const nide: Nide = data;
      try {
        const { data, error } = await client
          .from("teokset")
          .select("*")
          .eq("teos_id", nide.teos_id)
          .single();
        if (error) throw error;
        const teos: Teos = data;
        const erapaiva: string = haeEraPaiva(nide.lainaaika_vrk);
        const erapaivaDate: Date | null = dateConvert(erapaiva);
        const tiedot: Kirjatiedot = {
          nide_tiedot: nide,
          teos_tiedot: teos,
          erapaiva: erapaivaDate,
        };
        const lainausTiedot = useLainausState();
        lainausTiedot.setLainausData(tiedot);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setErapaiva = async (
    lainauslista: Kirjatiedot[] | null,
    lainaaja: number
  ): Promise<void> => {
    const client = useSupabaseClient<Nide>();
    try {
      const nideData: Nide[] | undefined = lainauslista?.map((lainaus) => {
        return {
          nide_id: lainaus.nide_tiedot.nide_id,
          teos_id: lainaus.nide_tiedot.teos_id,
          tyyppi: lainaus.nide_tiedot.tyyppi,
          lainaaika_vrk: lainaus.nide_tiedot.lainaaika_vrk,
          erapaiva: lainaus.erapaiva,
          palautus_pvm: null,
          lainaaja: lainaaja,
        };
      });
      const { error } = await client
        .from("niteet")
        .upsert(nideData, { onConflict: "nide_id" });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const palautaNide = async (input: string): Promise<void> => {
    const client = useSupabaseClient();
    try {
      const { data, error } = await client
        .from("niteet")
        .select("*")
        .eq("nide_id", input)
        .not("erapaiva", "is", null)
        .single();
      if (error) throw error;
      const nide: Nide = data;
      try {
        const { data, error } = await client
          .from("teokset")
          .select("*")
          .eq("teos_id", nide.teos_id)
          .single();
        if (error) throw error;
        const teos: Teos = data;
        const tiedot: Kirjatiedot = {
          nide_tiedot: nide,
          teos_tiedot: teos,
          erapaiva: nide.erapaiva,
        };
        const palautusTiedot = usePalautusState();
        palautusTiedot.setPalautusData(tiedot);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setPalautusPaiva = async (
    palautuslista: Kirjatiedot[] | null
  ): Promise<void> => {
    const client = useSupabaseClient<Nide>();
    const tanaan: Date = new Date();
    const lainaaja: number | null | undefined =
      palautuslista?.[0]?.nide_tiedot.lainaaja;
    try {
      const nideData: Nide[] | undefined = palautuslista?.map((palautus) => {
        return {
          nide_id: palautus.nide_tiedot.nide_id,
          teos_id: palautus.nide_tiedot.teos_id,
          tyyppi: palautus.nide_tiedot.tyyppi,
          lainaaika_vrk: palautus.nide_tiedot.lainaaika_vrk,
          erapaiva: null,
          palautus_pvm: tanaan,
          lainaaja: null,
        };
      });
      const { error } = await client
        .from("niteet")
        .upsert(nideData, { onConflict: "nide_id" });
      if (error) throw error;
      try {
        let uudetMaksut: number = 0.0;
        palautuslista?.forEach((palautus) => {
          if (palautus.erapaiva !== null) {
            const paivat: number = paivaEro(palautus.erapaiva);
            if (paivat > 20) {
              uudetMaksut += 6;
            } else {
              uudetMaksut += paivat * 0.3;
            }
          }
        });
        const client = useSupabaseClient<Kayttaja>();
        const { error } = await client.rpc("lisaa_maksuja", {
          id: lainaaja,
          maksu_lisa: uudetMaksut,
        });
        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const haeKayttajanLainat = async (kayttaja: Kayttaja) => {
    const client = useSupabaseClient();
    const kayttajanLainaTiedot = useLainausState()
    kayttajanLainaTiedot.kayttajanLainausData.value = [];
    try {
      const { data, error } = await client
        .from("niteet")
        .select("*")
        .eq("lainaaja", kayttaja.asiakasnro)
        .not("erapaiva", "is", null);
      if (error) throw error;
      const nide: Nide[] = data;
      try {
        for (const yksiNide of nide) {
          const { data, error } = await client
            .from("teokset")
            .select("*")
            .eq("teos_id", yksiNide.teos_id);
          if (error) throw error;
          const teos: Teos[] = data;
          for (const yksiTeos of teos) {
            const tiedot: Kirjatiedot = {
              nide_tiedot: yksiNide,
              teos_tiedot: yksiTeos,
              erapaiva: yksiNide.erapaiva,
            };
            const kayttajanlainausTiedot = useLainausState();
            kayttajanlainausTiedot.setKayttajanLainausData(tiedot);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    haeKayttaja,
    muokkaaKayttajaa,
    lisaaLainaus,
    setErapaiva,
    palautaNide,
    setPalautusPaiva,
    haeKayttajanLainat,
  };
};
