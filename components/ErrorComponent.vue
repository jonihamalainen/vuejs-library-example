<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="modal bg-white w-1/2 p-6 rounded-lg shadow-lg z-10 flex flex-col items-center">
        <h6 class="text-4xl font-semibold mb-2">Virhe</h6>
        <p class="text-2xl text-gray-700 text-center mb-4">{{ errorDataMessage.errorData.value?.viesti }}</p>
        <button
          @click="nollaaError()"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full h-24"
        >
          Sulje
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const errorDataMessage = useErrorState();
  </script>
  