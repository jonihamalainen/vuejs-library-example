<template>
  <div class="flex flex-col items-center h-screen">
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-4xl">Lainaus</h1>
    </div>
    <div class="mt-4">
      <h1 class="text-3xl">
        Tervetuloa lainaamaan, {{ userName.etunimi }} {{ userName.sukunimi }}
      </h1>
    </div>
    <div class="mt-10 w-1/2">
      <el-input
        class="border-2 w-full"
        v-model="input"
        placeholder="Lainattavan niteen id:"
      />
      <CustomButton
        button-text="Lainaa"
        type="primary"
        :onClick="() => lisaaLainaus(input)"
        properties="mt-10 w-full h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
      <CustomButton button-text="Peruuta" :onClick="takaisin" properties="mt-10 w-full h-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"/>
    </div>
    <div class="grid grid-cols-3 gap-2 w-full h-3/6">
      <div class="justify-center flex">
        <CustomButton
          v-if="lainaustiedot.lainausData.value && lainaustiedot.lainausData.value.length !== 0"
          button-text="Valmis, tulosta kuitti"
          properties="mt-10 my-auto h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :onClick="kuitilla"
        />
      </div>
      <div class="overflow-y-auto">
        <LainausLista :lainaukset="lainaustiedot.lainausData.value" />
      </div>
      <div class="justify-center flex">
        <CustomButton
          v-if="lainaustiedot.lainausData.value && lainaustiedot.lainausData.value.length !== 0"
          button-text="Valmis, älä tulosta kuittia"
          properties="mt-10 my-auto h-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :onClick="eiKuittia"
        />
      </div>
      <div v-if="errorDataMessage.errorData.value?.isError">
        <ErrorComponent/>
    </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Kayttaja, Kirjatiedot } from "types";
const user = useUserState();
const userName: Kayttaja = user.userData.value;
const errorDataMessage = useErrorState();
errorDataMessage.errorData.value = null;
const input: globalThis.Ref<string> = ref("");
const { lisaaLainaus, setErapaiva } = useSupabase();
const lainaustiedot = useLainausState();
const takaisin = (): void => {
  navigateTo("/");
};
const kuitilla = async (): Promise<void> => {
  const kayttajaLainaus: Kirjatiedot[] | null = lainaustiedot.lainausData.value;
  if (lainaustiedot.lainausData.value && lainaustiedot.lainausData.value) {
    const tanaan: Date = new Date();
    const kayttajaNimi: string = userName.etunimi + " " + userName.sukunimi;
    const osoiteTiedot: string =
      " Postitoimipaikka: " +
      userName.postitmp +
      "| Postinumero: " +
      userName.postinro +
      "| Katuosoite: " +
      userName.katuosoite;
    const kayttajaTiedot: string =
      `Lainauksen päivämäärä:` +
      tanaan.toLocaleDateString() +
      "\nLainaajan tiedot: Asiakasnro:" +
      userName.asiakasnro +
      "| Nimi:" +
      kayttajaNimi +
      "| Osoitetiedot:" +
      osoiteTiedot +
      "| Puh." +
      userName.puh;
    const kirjaTiedot: string =
      "\nLainattujen kirjojen tiedot:\n" +
      kayttajaLainaus?.map((lainaus) => {
        return (
          "\nTeoksen tekijä:" +
          lainaus.teos_tiedot.kirjoittaja +
          "| Teoksen nimi:" +
          lainaus.teos_tiedot.nimike +
          "| Niteen tyyppi:" +
          lainaus.nide_tiedot.tyyppi +
          "| Niteen id:" +
          lainaus.nide_tiedot.nide_id +
          "| Teoksen luokka:" +
          lainaus.teos_tiedot.luokka +
          "\nEräpäivä: " +
          lainaus.erapaiva +
          "\n-------------------"
        );
      });
    await setErapaiva(lainaustiedot.lainausData.value, userName.asiakasnro)
    console.log(kayttajaTiedot + kirjaTiedot);
    navigateTo("/");
    lainaustiedot.lainausData.value = [];
  } else {
    navigateTo("/");
  }
};
const eiKuittia = async (): Promise<void> => {
  await setErapaiva(lainaustiedot.lainausData.value, userName.asiakasnro)
  lainaustiedot.lainausData.value = [];
  navigateTo("/");
};
</script>
