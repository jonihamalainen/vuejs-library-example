import { ErrorType, Kayttaja, Kirjatiedot, Nide, Teos } from "types";

export const useSupabase = () => {
  const haeKayttaja = async (
    input: string,
    redirect: string
  ): Promise<void> => {
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
      const errorDataMessage = useErrorState();
      errorDataMessage.setErrorData({
        isError: true,
        viesti: "Käyttäjää ei löytynyt annetuilla tiedoilla",
      });
    }
  };
  const muokkaaKayttajaa = async (kayttaja: Kayttaja): Promise<void> => {
    const client = useSupabaseClient<Kayttaja>();
    const errorDataMessage = useErrorState();
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
      const errorMessage: ErrorType = {
        isError: true,
        viesti: "Virhe yhteidessä tietokantaan",
      };
      errorDataMessage.setErrorData(errorMessage);
    }
  };
  const lisaaLainaus = async (input: string) => {
    const client = useSupabaseClient();
    const errorDataMessage = useErrorState();
    try {
      const { data, error: niteetError } = await client
        .from("niteet")
        .select("*")
        .eq("nide_id", input)
        .is("lainaaja", null)
        .single();
      if (niteetError) throw niteetError;
      const nide: Nide = data;
      try {
        const { data, error: teosError } = await client
          .from("teokset")
          .select("*")
          .eq("teos_id", nide.teos_id)
          .single();
        if (teosError) throw teosError;
        const teos: Teos = data;
        const erapaiva: string = haeEraPaiva(nide.lainaaika_vrk);
        const erapaivaDate: Date | null = dateConvert(erapaiva);
        const tiedot: Kirjatiedot = {
          nide_tiedot: nide,
          teos_tiedot: teos,
          erapaiva: erapaivaDate,
        };
        const lainausTiedot = useLainausState();
        const exists: boolean | undefined =
          lainausTiedot.lainausData.value?.some(
            (item) => item.nide_tiedot.nide_id === tiedot.nide_tiedot.nide_id
          );
        if (exists) {
          throw teosError;
        } else {
          lainausTiedot.setLainausData(tiedot);
        }
      } catch (error) {
        const errorMessage: ErrorType = {
          isError: true,
          viesti: "Nide on jo lainattu",
        };
        errorDataMessage.setErrorData(errorMessage);
      }
    } catch (error) {
      const errorMessage: ErrorType = {
        isError: true,
        viesti: "Nidettä ei ole tai se on jo lainattu",
      };
      errorDataMessage.setErrorData(errorMessage);
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
      const errorDataMessage = useErrorState();
      const errorMessage: ErrorType = {
        isError: true,
        viesti: "Virhe yhteidessä tietokantaan",
      };
      errorDataMessage.setErrorData(errorMessage);
    }
  };

  const palautaNide = async (input: string): Promise<void> => {
    const client = useSupabaseClient();
    const errorDataMessage = useErrorState();
    try {
      const { data, error: nideError } = await client
        .from("niteet")
        .select("*")
        .eq("nide_id", input)
        .not("erapaiva", "is", null)
        .single();
      if (nideError) throw nideError;
      const nide: Nide = data;
      try {
        const { data, error: teosError } = await client
          .from("teokset")
          .select("*")
          .eq("teos_id", nide.teos_id)
          .single();
        if (teosError) throw teosError;
        const teos: Teos = data;
        const tiedot: Kirjatiedot = {
          nide_tiedot: nide,
          teos_tiedot: teos,
          erapaiva: nide.erapaiva,
        };
        const palautusTiedot = usePalautusState();
        const exists: boolean | undefined =
        palautusTiedot.palautusData.value?.some(
          (item) => item.nide_tiedot.nide_id === tiedot.nide_tiedot.nide_id
        );
        if (exists) {
          throw teosError;
        } else {
          palautusTiedot.setPalautusData(tiedot);
        }
      } catch (error) {
        const errorMessage: ErrorType = {
          isError: true,
          viesti: "Nide on jo palautettu",
        };
        errorDataMessage.setErrorData(errorMessage);
      }
    } catch (error) {
      const errorMessage: ErrorType = {
        isError: true,
        viesti: "Nidettä ei ole tai sitä ei ole lainattu",
      };
      errorDataMessage.setErrorData(errorMessage);
    }
  };

  const setPalautusPaiva = async (
    palautuslista: Kirjatiedot[] | null
  ): Promise<void> => {
    const client = useSupabaseClient<Nide>();
    const errorDataMessage = useErrorState();
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
            uudetMaksut = maksuMaara(palautus.erapaiva);
          }
        });
        const client = useSupabaseClient<Kayttaja>();
        const { error } = await client.rpc("lisaa_maksuja", {
          id: lainaaja,
          maksu_lisa: uudetMaksut,
        });
        if (error) throw error;
      } catch (error) {
        const errorMessage: ErrorType = {
          isError: true,
          viesti: "Virhe yhteidessä tietokantaan",
        };
        errorDataMessage.setErrorData(errorMessage);
      }
    } catch (error) {
      const errorMessage: ErrorType = {
        isError: true,
        viesti: "Virhe yhteidessä tietokantaan",
      };
      errorDataMessage.setErrorData(errorMessage);
    }
  };

  const haeKayttajanLainat = async (kayttaja: Kayttaja) => {
    const client = useSupabaseClient();
    const kayttajanLainaTiedot = useLainausState();
    const errorDataMessage = useErrorState();
    kayttajanLainaTiedot.kayttajanLainausData.value = [];
    kayttajanLainaTiedot.lainatMyohassaData.value = [];
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
            if (isLate(yksiNide.erapaiva)) {
              kayttajanLainaTiedot.setLainatMyohassaData(tiedot);
            } else {
              kayttajanLainaTiedot.setKayttajanLainausData(tiedot);
            }
          }
        }
      } catch (error) {
        const errorMessage: ErrorType = {
          isError: true,
          viesti: "Virhe yhteidessä tietokantaan",
        };
        errorDataMessage.setErrorData(errorMessage);
      }
    } catch (error) {
      const errorMessage: ErrorType = {
        isError: true,
        viesti: "Virhe yhteidessä tietokantaan",
      };
      errorDataMessage.setErrorData(errorMessage);
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
