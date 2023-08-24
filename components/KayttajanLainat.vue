<template>
    <div class="flex flex-col">
        <div>
        <h1 class="text-3xl">Lainat:</h1>
    </div>
    <div class="border-2 mt-2 text-xl p-2 w-full"  v-if="props.lainat?.length" v-for="laina in props.lainat">
        <h1><b>Kirjan nimi:</b> {{ laina.teos_tiedot.nimike }}</h1>
        <h1><b>Kirjoittaja:</b> {{ laina.teos_tiedot.kirjoittaja }}</h1>
        <h1><b>Luokka:</b> {{ laina.teos_tiedot.luokka }}</h1>
        <h1><b>Niteen tyyppi:</b> {{ laina.nide_tiedot.tyyppi }}</h1>
        <h1><b>Eräpäivä: </b>{{ laina.erapaiva }}</h1>
    </div>
    <div  v-else>
        <h1>Ei lainoja</h1>
    </div>
    </div>
</template>

<script setup lang="ts">
import { Kirjatiedot } from 'types';

const props = defineProps<{
  lainat: Kirjatiedot[] | null;
}>();

</script>