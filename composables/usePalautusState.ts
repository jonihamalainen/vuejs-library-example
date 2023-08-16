import { Kirjatiedot } from "types"

export const usePalautusState = createGlobalState (
    () => {
        const palautusData = useState<Kirjatiedot[] | null>();

        const setPalautusData = (tiedot: Kirjatiedot): void => {
            if (!palautusData.value) {
                palautusData.value = []; 
            }
            palautusData.value.push(tiedot);
          };
        return {palautusData, setPalautusData}
    }
)