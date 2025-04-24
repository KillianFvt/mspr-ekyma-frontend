<template>
    <div class="bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">{{ title }}</h2>
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  // eslint-disable-next-line no-undef
  defineProps({
    title: String
  });
  </script>
  