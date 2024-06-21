<template>
  <form @submit.prevent="submit">
    <input
      class="input"
      type="text"
      name="username"
      placeholder="learner1225"
      minlength="4"
      v-model="username"
    />
    <input class="input" type="email" name="email" placeholder="email@mail.com" v-model="email" />
    <input
      class="input"
      type="password"
      name="password"
      placeholder="bE23******"
      minlength="8"
      v-model="password"
    />

    <button type="submit" class="btn">Регистрация</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <RouterLink to="login">Войти</RouterLink>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { useUserStore } from '@/stores/UserStore'

import router from '@/router'

const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')

const errorMessage = ref('')

async function submit() {
  errorMessage.value = ''
  if (username.value && email.value && password.value) {
    const response = await userStore.regUser(username.value, email.value, password.value)

    if (response instanceof Error) {
      errorMessage.value = 'Данные неверны. Пожалуйста, попробуйте снова.'
    } else {
      router.push('/')
    }
  } else {
    errorMessage.value = 'заполните все поля пожалуйста'
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
