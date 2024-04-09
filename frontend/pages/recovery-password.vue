<template>
  <div class="my-auto">
    <form class="bg-[#432671] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
      <p class="flex justify-center text-white text-2xl font-bold mb-4">
        Восстановление пароля
      </p>
      <div class="mb-6">
        <label class="block text-white text-sm font-bold mb-2" for="password">
          Почта
        </label>
        <input
          class="bg-[#CBAAFF] shadow appearance-none border border-red-500 rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="mail"
          type="mail"
          placeholder="Почтовый адрес"
        />
        <p class="text-red-500 text-xs italic">Введите почту</p>
      </div>
      <div class="flex items-center justify-between">
        <nuxt-link to="/enter-code">
          <button
            class="bg-[#CBAAFF] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Получить код
          </button>
        </nuxt-link>
      </div>
      <p class="mb-0 mt-2 pt-3 text-sm text-gray-500">
        Уже зарегистрированы?
        <a
          href="/login"
          class="text-[#CBAAFF] text-danger transition duration-150 ease-in-out hover:hover:text-purple-800 focus:text-danger-600 active:text-danger-700"
          >Войти</a
        >
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "form-layout",
});
</script>

<style scoped></style>
