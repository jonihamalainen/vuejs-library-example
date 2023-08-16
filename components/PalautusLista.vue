<template>
    <div>
        <h1 class="text-3xl">Palautukset:</h1>
    </div>
    <div class="border-2 mt-2 text-xl p-2 w-full"  v-if="props.palautukset?.length" v-for="palautus in props.palautukset">
        <h1><b>Kirjan nimi:</b> {{ palautus.teos_tiedot.nimike }}</h1>
        <h1><b>Kirjoittaja:</b> {{ palautus.teos_tiedot.kirjoittaja }}</h1>
        <h1><b>Luokka:</b> {{ palautus.teos_tiedot.luokka }}</h1>
        <h1><b>Niteen tyyppi:</b> {{ palautus.nide_tiedot.tyyppi }}</h1>
        <h1 v-if="isLate(palautus.erapaiva)">Palautus on myöhässä</h1>
        <h1 v-else>Ei myöhästymismaksua</h1>
    </div>
    <div  v-else>
        <h1>Ei lisättyjä palautuksia</h1>
    </div>
</template>

<script setup lang="ts">
import { Kirjatiedot } from 'types';

const props = defineProps<{
  palautukset: Kirjatiedot[] | null;
}>();

</script>