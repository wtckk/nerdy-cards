<template>
  <footer class="flex flex-col float-end bg-[#432671] text-[#4B2A81]">
    <div class="container mx-auto flex justify-between py-[24px]">
      <div class="flex gap-[16px]">
        <NuxtLink to="https://t.me/chelovekkq" class="text my-auto no-underline"
          >О компании</NuxtLink
        >
        <NuxtLink to="https://t.me/chelovekkq" class="text my-auto no-underline"
          >Реклама</NuxtLink
        >
        <NuxtLink to="https://t.me/chelovekkq" class="text my-auto no-underline"
          >Поддержка</NuxtLink
        >
      </div>

      <NuxtLink
        class="p-[5px] bg-[#c4b5fd] rounded-[10px] flex justify-center"
        to="https://vk.com/feed"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25684.png"
          class="symbol"
          alt="VK icon"
        />
      </NuxtLink>
    </div>

    <div class="py-4 text-center bg-[#6035A5] text-[#CBAAFF]">
      &copy; Nerdy Cards
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.text {
  font-size: 16px;
  font-weight: 400;
  padding: 8px;
  background: #c4b5fd;
  border-radius: 10px;
}

.symbol {
  height: 35px;
}
</style>
