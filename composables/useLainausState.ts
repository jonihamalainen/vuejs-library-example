import { Kirjatiedot } from "types"

export const useLainausState = createGlobalState (
    () => {
        const lainatMyohassaData = useState<Kirjatiedot[] | null>();
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

        const setLainatMyohassaData = (tiedot: Kirjatiedot): void => {
          if(!lainatMyohassaData.value){
            lainatMyohassaData.value = [];
          }
          lainatMyohassaData.value.push(tiedot)
        }

        return {lainausData, setLainausData, kayttajanLainausData, setKayttajanLainausData, lainatMyohassaData, setLainatMyohassaData}
    }
)