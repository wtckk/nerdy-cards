<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style>
.btn {
  @apply py-1 px-2 rounded border;
}

.btn-black {
  @apply bg-black text-white;
}
</style>
