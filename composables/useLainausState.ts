import { Kirjatiedot } from "types"

export const useLainausState = createGlobalState (
    () => {
        const kayttajanLainausData = useState<Kirjatiedot[] | null>();
        const lainausData = useState<Kirjatiedot[] | null>();

        const setLainausData = (tiedot: Kirjatiedot): void => {
            if (!lainausData.value) {
              lainausData.value = []; 
            }
            lainausData.value.push(tiedot);
          };
        
        const setKayttajanLainausData = (tiedot: Kirjatiedot): void => {
          if (!kayttajanLainausData.value) {
            kayttajanLainausData.value = []; 
          }
          kayttajanLainausData.value.push(tiedot);
        };

        return {lainausData, setLainausData, kayttajanLainausData, setKayttajanLainausData}
    }
)