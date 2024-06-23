<template>
  <form @submit.prevent="submit">
    <h1>Вход</h1>
    <p>Почта</p>
    <input class="input" type="email" name="email" v-model="email" />
    <p>Пароль</p>
    <input class="input" type="password" name="password" v-model="password" />

    <button type="submit" class="btn">Войти</button>
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
