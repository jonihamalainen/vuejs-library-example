<template>
    <div>
        <h1 class="text-3xl mt-4">Lainaukset:</h1>
    </div>
    <div class="border-2 mt-2 text-xl p-2 w-1/3"  v-if="props.lainaukset?.length" v-for="laina in props.lainaukset">
        <h1><b>Kirjan nimi:</b> {{ laina.teos_tiedot.nimike }}</h1>
        <h1><b>Kirjoittaja:</b> {{ laina.teos_tiedot.kirjoittaja }}</h1>
        <h1><b>Luokka:</b> {{ laina.teos_tiedot.luokka }}</h1>
        <h1><b>Niteen tyyppi:</b> {{ laina.nide_tiedot.tyyppi }}</h1>
        <h1><b>Eräpäivä:</b> {{ laina.erapaiva }}</h1>
    </div>
    <div v-else>
        <h1>Ei lisättyjä lainauksia</h1>
    </div>
</template>

<script setup lang="ts">
import { Kirjatiedot } from 'types';

const props = defineProps<{
  lainaukset: Kirjatiedot[] | null;
}>();

</script>