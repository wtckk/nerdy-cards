<template>
  <div class="my-auto">
    <form class="bg-[#432671] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 w-96">
      <p class="flex justify-center text-white text-2xl font-bold mb-4">
        Введите новый пароль
      </p>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="password">
          Пароль
        </label>
        <input
          class="bg-[#CBAAFF] shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="***********"
        />
        <p class="text-red-500 text-xs italic">Введите пароль</p>
      </div>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="password">
          Повторите пароль
        </label>
        <input
          class="bg-[#CBAAFF] shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="***********"
        />
        <p class="text-red-500 text-xs italic">Введите пароль</p>
      </div>
      <div class="flex items-center justify-between">
        <nuxt-link to="/login">
          <button
            class="bg-[#CBAAFF] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Сменить пароль
          </button>
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "form-layout",
});
</script>

<style scoped></style>
