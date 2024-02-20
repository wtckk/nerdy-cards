<template>
  <div class="h-screen w-screen bg-slate-300">
    <div class="container mx-auto px-[24px] h-screen bg-slate-400 shadow-xl">
      <header class="flex justify-between py-[24px]">
        <div>
          <NuxtLink to="/">LOGO</NuxtLink>
        </div>

        <div class="flex gap-[32px]">
          <NuxtLink>My moduls</NuxtLink>
          <NuxtLink>Popular</NuxtLink>
          <NuxtLink>Create</NuxtLink>
        </div>

        <div>
          <NuxtLink>Accaunt</NuxtLink>
        </div>
      </header>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
