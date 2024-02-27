<template>
  <div class="h-screen w-screen bg-[#6035A5] overflow-x-hidden">
    <header class="flex justify-between py-[24px] bg-[#432671]">
      <div>
        <NuxtLink to="/">LOGO</NuxtLink>
      </div>

      <div class="flex gap-[32px]">search</div>

      <div>
        <NuxtLink>Accaunt</NuxtLink>
      </div>
    </header>

    <div class="container mx-auto min-h-[700px]">
      <slot></slot>
    </div>

    <footer class="flex justify-center py-[24px] bg-[#432671]">
      <div>footer</div>
    </footer>
    <div class="flex justify-center py-[12px]">@Nerdy cards</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
