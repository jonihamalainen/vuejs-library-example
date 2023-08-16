<template>
    <div>
        <h1 class="text-2xl"><b>Asiakasnumero: </b>{{ userName.asiakasnro }}</h1>
        <h1 class="text-2xl"><b>Etunimi: </b>{{ userName.etunimi }}</h1>
        <h1 class="text-2xl"><b>Sukunimi: </b>{{ userName.sukunimi }}</h1>
        <h1 class="text-2xl"><b>Katuosoite: </b>{{ userName.katuosoite }}</h1>
        <h1 class="text-2xl"><b>Postinumero: </b>{{ userName.postinro }}</h1>
        <h1 class="text-2xl"><b>Postitoimipaikka: </b>{{ userName.postitmp }}</h1>
        <h1 class="text-2xl"><b>Puhelinnumero: </b>{{ userName.puh }}</h1>
    </div>
</template>
<script setup lang="ts">
import { Kayttaja } from 'types';
const user = useUserState();
const userName: Kayttaja = user.userData.value;
</script>