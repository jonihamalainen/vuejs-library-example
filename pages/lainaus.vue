<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-2xl"> Tervetuloa lainaamaan, {{ userName.etunimi }} {{ userName.sukunimi }}</h1>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Kayttaja } from 'types';
const user = useUserState();
const userName: Kayttaja  = user.userData.value;
</script>
