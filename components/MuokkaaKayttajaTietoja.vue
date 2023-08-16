<template>
  <div class="flex flex-col mb-4">
    <form @submit.prevent="laheta">
      <div class="mt-2">
        <label
          class="mb-2 uppercase font-bold text-lg text-grey-darkest"
          for="etunimi"
          >Etunimi:</label
        >
        <input
          class="border py-2 px-3 text-grey-darkest ml-2"
          v-model="uusiKayttaja.etunimi"
          type="text"
          id="etunimi"
        />
      </div>
      <div class="mt-2">
        <label
          class="mb-2 uppercase font-bold text-lg text-grey-darkest"
          for="sukunimi"
          >Sukunimi:</label
        >
        <input
          class="border py-2 px-3 text-grey-darkest ml-2"
          v-model="uusiKayttaja.sukunimi"
          type="text"
          id="sukunimi"
        />
      </div>
      <div class="mt-2">
        <label
          class="mb-2 uppercase font-bold text-lg text-grey-darkest"
          for="katuosoite"
          >Katuosoite:</label
        >
        <input
          class="border py-2 px-3 text-grey-darkest ml-2"
          v-model="uusiKayttaja.katuosoite"
          type="text"
          id="katuosoite"
        />
      </div>
      <div class="mt-2">
        <label
          class="mb-2 uppercase font-bold text-lg text-grey-darkest"
          for="postinumero"
          >Postinumero:</label
        >
        <input
          class="border py-2 px-3 text-grey-darkest ml-2"
          v-model="uusiKayttaja.postinro"
          type="text"
          id="postinumero"
        />
      </div>
      <div class="mt-2">
        <label
          class="mb-2 uppercase font-bold text-lg text-grey-darkest"
          for="postitmp"
          >Postitoimipaikka:</label
        >
        <input
          class="border py-2 px-3 text-grey-darkest ml-2"
          v-model="uusiKayttaja.postitmp"
          type="text"
          id="postitmp"
        />
      </div>
      <div class="mt-2">
        <label
          class="mb-2 uppercase font-bold text-lg text-grey-darkest"
          for="puh"
          >Puhelinnumero:</label
        >
        <input
          class="border py-2 px-3 text-grey-darkest ml-2"
          v-model="uusiKayttaja.puh"
          type="text"
          id="puh"
        />
      </div>

      <button
        class="mt-10 w-full h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Muokkaa tietoja
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { Kayttaja } from "types";
import { ref } from "vue";
const props = defineProps({
  showMuokkaa: Boolean,
  toggleMuokkaa: Function as PropType<() => void>,
});
const { muokkaaKayttajaa } = useSupabase();
const kayttaja = useUserState();
const userData = kayttaja.userData.value;

const kayttajaUpdate = ref<Kayttaja>({
  asiakasnro: userData.asiakasnro,
  sukunimi: userData.sukunimi,
  etunimi: userData.etunimi,
  katuosoite: userData.katuosoite,
  postinro: userData.postinro,
  postitmp: userData.postitmp,
  puh: userData.puh,
  maksut: userData.maksut,
});

const uusiKayttaja: Kayttaja = {
  asiakasnro: kayttajaUpdate.value.asiakasnro,
  sukunimi: kayttajaUpdate.value.sukunimi,
  etunimi: kayttajaUpdate.value.etunimi,
  katuosoite: kayttajaUpdate.value.katuosoite,
  postinro: kayttajaUpdate.value.postinro,
  postitmp: kayttajaUpdate.value.postitmp,
  puh: kayttajaUpdate.value.puh,
  maksut: kayttajaUpdate.value.maksut,
};

const invokeToggleMuokkaa = () => {
  if (props.toggleMuokkaa) {
    props.toggleMuokkaa();
  }
};

const laheta = async (): Promise<void> => {
  await muokkaaKayttajaa(uusiKayttaja);
  invokeToggleMuokkaa();
};
</script>
