import { Kirjatiedot } from "types"

export const useLainausState = createGlobalState (
    () => {
        const lainausData = useState<Kirjatiedot[] | null>();

        const setLainausData = (tiedot: Kirjatiedot): void => {
            if (!lainausData.value) {
              lainausData.value = []; 
            }
            lainausData.value.push(tiedot);
          };
        return {lainausData, setLainausData}
    }
)