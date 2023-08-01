<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
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
      <CustomButton button-text="Kirjaudu" type="primary" :onClick="() => haeKayttaja(input)" />
      <CustomButton button-text="Peruuta" type="danger" :onClick="takaisin" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const input: globalThis.Ref<string> = ref("");
const { haeKayttaja } = useSupabase();
const takaisin = (): void => {
  navigateTo("/");
};
</script>
