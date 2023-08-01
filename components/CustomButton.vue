<template>
  <div class="w-full">
    <button
      :class="properties"
      @click="handleClick"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
const { buttonText, onClick, properties } = defineProps(['buttonText', 'onClick', 'properties']);

const handleClick = () => {
  if (typeof onClick === 'function') {
    onClick(); 
  }
};
</script>

