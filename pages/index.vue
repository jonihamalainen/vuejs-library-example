<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="w-2/6 h-auto">
      <nuxt-img src="kirjasto.jpg" width="auto" height="auto" />
    </div>
    <div
      class="items-center justify-center flex w-full bg-amber-600 border-y-2 border-black mt-4 h-12"
    >
      <h1 class="text-2xl">KIRJASTON LAINAUS- JA PALAUTUSAUTOMAATTI</h1>
    </div>
    <div class="grid grid-rows-1 grid-cols-3 w-full mt-4">
      <NuxtLink to="/lainaus">
        <div
          class="bg-amber-600 mx-8 text-2xl rounded-lg items-center justify-center flex h-24"
        >
          Lainaus
        </div>
      </NuxtLink>

      <NuxtLink to="/palautus">
        <div
          class="bg-amber-600 mx-8 text-2xl rounded-lg items-center justify-center flex h-24"
        >
          Palautus
        </div>
      </NuxtLink>

      <NuxtLink to="/tiedot">
        <div
          class="bg-amber-600 mx-8 text-2xl rounded-lg items-center justify-center flex h-24"
        >
          Omat tiedot
        </div></NuxtLink
      >
    </div>
  </div>
</template>