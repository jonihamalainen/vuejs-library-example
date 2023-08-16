<template>
  <div class="flex flex-col items-center h-screen">
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-4xl">Omat tiedot</h1>
    </div>
    <div class="grid grid-cols-3 gap-2 w-full h-3/6 mt-4">
      <div class="overflow-y-auto justify-center flex">
        <KayttajanLainat :lainat="kayttajanLainaukset"/>
      </div>
      <div class="overflow-y-auto justify-center flex">
        <div class="flex flex-col">
          <div>
            <KayttajaTiedot v-if="!showMuokkaa" />
            <MuokkaaKayttajaTietoja v-if="showMuokkaa" :showMuokkaa="showMuokkaa" :toggleMuokkaa="toggleMuokkaa"/>
          </div>
          <div>
            <CustomButton
              v-if="!showMuokkaa"
              button-text="Muokkaa"
              type="primary"
              properties="mt-10 w-full h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              :onClick="toggleMuokkaa"
            />
            <CustomButton
              v-else
              button-text="Palaa"
              type="primary"
              properties="mt-10 w-full h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              :onClick="toggleMuokkaa"
            />
          </div>
        </div>
      </div>
      <div class="justify-center flex">
        <h1>Maksut</h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Kirjatiedot } from 'types';

const kayttajatiedot = useUserState();
const {haeKayttajanLainat} = useSupabase();
const lainausTiedot = useLainausState();
await haeKayttajanLainat(kayttajatiedot.userData.value)
const showMuokkaa: globalThis.Ref<boolean> = ref(false);
const toggleMuokkaa = () => {
  showMuokkaa.value = !showMuokkaa.value;
};
const kayttajanLainaukset: Kirjatiedot[] | null = lainausTiedot.kayttajanLainausData.value
</script>
