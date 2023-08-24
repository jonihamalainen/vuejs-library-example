<template>
  <div class="flex flex-col items-center h-screen">
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-4xl">Palautus</h1>
    </div>
    <div class="mt-10 w-1/2">
      <el-input
        class="border-2 w-full"
        v-model="input"
        placeholder="Palautettavan niteen id:"
      />
      <CustomButton
        button-text="Palauta"
        type="primary"
        :onClick="() => palautaNide(input)"
        properties="mt-10 w-full h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
      <CustomButton button-text="Peruuta" :onClick="takaisin" properties="mt-10 w-full h-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"/>
    </div>
    <div class="grid grid-cols-2 gap-2 w-full h-3/6">
      <div class="overflow-y-auto ml-10 mt-10">
        <PalautusLista
          v-if="
            palautusTiedot.palautusData.value &&
            palautusTiedot.palautusData.value.length !== 0
          "
          :palautukset="palautusTiedot.palautusData.value"
        />
      </div>
      <div class="justify-center flex">
        <CustomButton
          v-if="
            palautusTiedot.palautusData.value &&
            palautusTiedot.palautusData.value.length !== 0
          "
          button-text="Palautus valmis"
          :onClick="palauta"
          properties="mt-10 my-auto h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </div>
    </div>
    <div v-if="errorDataMessage.errorData.value?.isError">
        <ErrorComponent/>
    </div>
  </div>
</template>
<script setup lang="ts">
const input: globalThis.Ref<string> = ref("");
const errorDataMessage = useErrorState();
const { palautaNide, setPalautusPaiva } = useSupabase();
const palautusTiedot = usePalautusState();
const palauta = async () => {
  await setPalautusPaiva(palautusTiedot.palautusData.value);
  navigateTo("/");
  palautusTiedot.palautusData.value = [];
};
const takaisin = (): void => {
  navigateTo("/");
};
</script>
