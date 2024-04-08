<template>
  <div class="my-auto">
    <form class="bg-[#432671] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 w-96">
      <div class="mb-4">
        <label class="block text-white text-sm font-bold mb-2" for="username">
          Логин
        </label>
        <input
          class="bg-[#CBAAFF] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Логин"
        />
      </div>
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
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <nuxt-link to="/">
          <button
            class="bg-[#CBAAFF] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Войти
          </button>
        </nuxt-link>
        <a
          class="inline-block align-baseline font-bold text-sm text-[#CBAAFF] hover:text-purple-800"
          href="/recovery-password"
        >
          Забыли пароль?
        </a>
      </div>
      <p class="mb-0 mt-2 pt-3 text-sm text-gray-500">
        Ещё не зарегистрированы?
        <a
          href="/register"
          class="text-[#CBAAFF] text-danger transition duration-150 ease-in-out hover:hover:text-purple-800 focus:text-danger-600 active:text-danger-700"
          >Регистрация</a
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
