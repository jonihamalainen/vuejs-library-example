<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-2xl">Syötä kortin numero</h1>
    </div>
    <div class="items-center justify-center flex flex-col mt-4 w-1/2">
      <el-input
        class="border-2 w-full"
        v-model="input"
        placeholder="Anna kortin numero..."
      />
      <CustomButton button-text="Kirjaudu" :onClick="() => haeKayttaja(input, redirectSivu)" properties="mt-10 w-64 h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
      <CustomButton button-text="Peruuta" :onClick="takaisin" properties="mt-10 w-64 h-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const input: globalThis.Ref<string> = ref("");
const { haeKayttaja } = useSupabase();
const sivuTiedot = useSivuState();
let redirectSivu: string = sivuTiedot.sivuData.value;
if (redirectSivu === undefined) {
  redirectSivu = ""
}
const takaisin = (): void => {
  navigateTo("/");
};
</script>
