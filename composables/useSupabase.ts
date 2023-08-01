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
        const tiedot: Kirjatiedot = {
          nide_tiedot: nide,
          teos_tiedot: teos,
          erapaiva: erapaiva
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

  return {
    haeKayttaja,
    lisaaLainaus,
  };
};
