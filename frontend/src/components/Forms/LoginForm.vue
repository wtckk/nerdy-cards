<template>
  <form @submit.prevent="submit">
    <h1>Вход</h1>

    <UInput type="email" label="Почта" name="email" v-model="email" />
    <UInput type="password" label="Пароль" name="password" v-model="password" />

    <UButton type="submit">Войти</UButton>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <p class="registration-question">
      Ещё не зарегистрированы?
      <RouterLink to="registration">Регистрация</RouterLink>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useUserStore } from '@/stores/UserStore'

import router from '@/router'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

const errorMessage = ref('')

async function submit() {
  errorMessage.value = ''
  if (email.value && password.value) {
    const response = await userStore.loginUser(email.value, password.value)

    if (response instanceof Error) {
      errorMessage.value = 'Данные неверны. Пожалуйста, попробуйте снова.'
    } else {
      router.push('/')
    }
  } else {
    errorMessage.value = 'Заполните все поля, пожалуйста.'
  }
}
</script>

<style scoped>
form {
  background-color: #4b2a81;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
  width: 400px;
}

button {
  margin-top: 16px;
}

h1 {
  display: flex;
  justify-content: center;
  margin: 0px;
}

a {
  color: #a78bfa;
  font-weight: 500;
}

.registration-question {
  font-size: 12px;
}

.error-message {
  color: red;
}
</style>
