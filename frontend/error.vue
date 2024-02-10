<template>
  <div
    class="flex flex-col w-screen h-screen my-auto justify-center items-center"
  >
    <p>error page :v</p>
    <p>{{ error.statusCode }}</p>
    <p>{{ error.message }}</p>
    <button @click="handleClearError" class="bg-gray-300 rounded-md p-1">
      home page
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps(["error"]);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<style scoped></style>
