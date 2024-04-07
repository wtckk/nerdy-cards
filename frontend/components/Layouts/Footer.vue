<template>
  <footer class="flex flex-col bg-[#432671] text-[#4B2A81]">
    <div class="container mx-auto flex justify-between py-[24px]">
      <div class="flex gap-[16px]">
        <div class="text my-auto">О компании</div>
        <div class="text my-auto">Реклама</div>
        <div class="text my-auto">Поддержка</div>
      </div>

      <div class="p-[5px] bg-[#c4b5fd] rounded-[10px]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25684.png"
          class="symbol"
          alt="VK icon"
        />
      </div>
    </div>

    <div class="py-4 text-center text-gray-400">&copy; Nerdy Cards</div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.text {
  font-size: 16px;
  font-weight: 500;
  font-family: "Arial";
  line-height: 1.5;
  padding: 10px;
  background: #c4b5fd;
  border-radius: 10px;
}

.symbol {
  height: 45px;
}
</style>
