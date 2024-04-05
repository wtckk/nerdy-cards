<template>
  <div
    class="h-screen w-screen flex flex-col justify-between bg-[#6035A5] overflow-x-hidden"
  >
    <LayoutsHeader />

    <div class="container mx-auto h-full">
      <slot></slot>
    </div>

    <LayoutsFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
