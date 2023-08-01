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
  return {
    haeKayttaja,
  };
};
