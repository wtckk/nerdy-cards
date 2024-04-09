<template>
  <div class="h-screen w-screen flex flex-col bg-[#6035A5] overflow-x-hidden">
    <LayoutsHeader />

    <div class="container mx-auto px-[24px]">
      <slot></slot>
    </div>

    <LayoutsFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
