<template>
  <header
    class="flex justify-between sticky w-auto py-[18px] px-[24px] bg-[#432671]"
  >
    <div class="flex items-center">
      <NuxtLink to="/" class="text-[32px] font-light text-white"
        >Nerdy cards</NuxtLink
      >
    </div>

    <div class="flex gap-[12px] w-1/3">
      <div
        class="bg-[#6035A5] w-2/4 flex items-center px-[16px] rounded-full my-auto p-2"
      >
        <input
          class="bg-[#6035A5] border-[#bebebe] border-0 border-b w-full"
          type="text"
          placeholder="search"
        />
      </div>

      <button
        class="text-white text-[18px] bg-[#6035A5] rounded-full h-[40px] w-[40px] flex items-center justify-center hover:scale-110 my-auto"
      >
        <nuxt-icon name="search" />
      </button>
    </div>

    <div class="flex gap-[12px]">
      <button
        class="text-white text-[24px] bg-[#6035A5] rounded-full h-[50px] w-[50px] flex items-center justify-center hover:scale-110"
      >
        <nuxt-icon name="notification" />
      </button>

      <NuxtLink
        class="text-white text-[24px] bg-[#6035A5] rounded-full h-[50px] w-[50px] flex items-center justify-center hover:scale-110"
        to="/login"
      >
        <nuxt-icon name="accaunt" />
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
