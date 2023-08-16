<template>
  <div class="flex flex-col">
    <div>
      <h1 class="text-3xl">Myöhästyneet lainat ja myöhästymismaksut:</h1>
      <h2 class="text-2xl">Nykyiset maksut: {{ kayttajaTiedot?.maksut }} €</h2>
      <h2 v-if="uudetMaksut() !== 0" class="text-2xl">Myöhästyneistä kertyvät uudet maksut: {{ uudetMaksut() }}€ </h2>
    </div>
    <div
      class="border-2 mt-2 text-xl p-2 w-full"
      v-if="props.lainat?.length"
      v-for="laina in props.lainat"
    >
      <h1><b>Kirjan nimi:</b> {{ laina.teos_tiedot.nimike }}</h1>
      <h1><b>Kirjoittaja:</b> {{ laina.teos_tiedot.kirjoittaja }}</h1>
      <h1><b>Luokka:</b> {{ laina.teos_tiedot.luokka }}</h1>
      <h1><b>Niteen tyyppi:</b> {{ laina.nide_tiedot.tyyppi }}</h1>
      <h1><b>Eräpäivä: </b>{{ laina.erapaiva }}</h1>
      <h1><b>Niteen myöhästymismaksu: </b>{{ maksuMaara(laina.erapaiva) }}€</h1>
    </div>
    <div v-else>
      <h1 class="text-xl">Ei myöhässä olevia lainoja</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Kayttaja, Kirjatiedot } from "types";
const props = defineProps<{
  lainat: Kirjatiedot[] | null;
  kayttajaTiedot: Kayttaja | null;
}>();

const uudetMaksut = (): number => {
  let uusiKokonaisMaksu: number = 0.0;
  if (props.lainat) {
    for (const laina of props.lainat) {
      let nideMaksu: number = maksuMaara(laina.erapaiva);
      uusiKokonaisMaksu += nideMaksu;
    }
    return uusiKokonaisMaksu;
  } else {
    return 0;
  }
};
</script>
