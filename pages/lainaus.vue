<template>
   <div class="flex flex-col items-center min-h-screen">
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-4xl">Lainaus</h1>
    </div>
    <div class="mt-4">
      <h1 class="text-3xl">Tervetuloa lainaamaan, {{ userName.etunimi }} {{ userName.sukunimi }}</h1>
    </div>
    <div class="mt-10 w-1/2">
      <el-input
        class="border-2 w-full"
        v-model="input"
        placeholder="Lainattavan niteen id:"
      />
      <CustomButton button-text="Lainaa" type="primary" :onClick='() => lisaaLainaus(input)' properties="mt-10 w-full h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
    </div>
    <LainausLista :lainaukset="lainaustiedot.lainausData.value"/>
  </div>
</template>
<script lang="ts" setup>
import { Kayttaja } from 'types';
const user = useUserState();
const userName: Kayttaja  = user.userData.value;
const input: globalThis.Ref<string> = ref("");
const { lisaaLainaus } = useSupabase();
const lainaustiedot = useLainausState();
</script>
