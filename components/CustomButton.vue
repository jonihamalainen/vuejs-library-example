<template>
  <div class="w-full">
    <el-button
      class="mt-10 w-full"
      size="large"
      :type="type"
      @click="handleClick"
    >
      {{ buttonText }}
    </el-button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { buttonText, onClick, type } = defineProps(['buttonText', 'onClick', 'type']);

const handleClick = () => {
  if (typeof onClick === 'function') {
    onClick(); 
  }
};
</script>
