import { Kirjatiedot, Nide, Teos } from "types";

export const useSupabase = () => {
  const haeKayttaja = async (input: string): Promise<void | boolean> => {
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
      navigateTo("/lainaus");
    } catch (error) {
      return true;
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
        const erapaivaDate: Date |null = dateConvert(erapaiva);
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
    lainauslista: Kirjatiedot[] | null
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
          erapaiva: nide.erapaiva
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

  const setPalautusPaiva =async (
    palautuslista: Kirjatiedot[] | null
  ): Promise<void> => {
    const client = useSupabaseClient<Nide>();
    try {
      const tanaan: Date = new Date();
      const nideData: Nide[] | undefined = palautuslista?.map((palautus) => {
        return {
          nide_id: palautus.nide_tiedot.nide_id,
          teos_id: palautus.nide_tiedot.teos_id,
          tyyppi: palautus.nide_tiedot.tyyppi,
          lainaaika_vrk: palautus.nide_tiedot.lainaaika_vrk,
          erapaiva: null,
          palautus_pvm: tanaan,
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

  return {
    haeKayttaja,
    lisaaLainaus,
    setErapaiva,
    palautaNide,
    setPalautusPaiva
  };
};
