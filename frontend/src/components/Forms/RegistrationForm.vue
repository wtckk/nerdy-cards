<template>
  <form @submit.prevent="submit">
    <h1>Регистрация</h1>

    <UInput label="Логин" name="username" :min-max="[4, null]" v-model="username" />
    <UInput label="Почта" type="email" name="email" v-model="email" />
    <UInput
      label="Пароль"
      type="password"
      name="password"
      :min-max="[8, null]"
      v-model="password"
    />

    <UButton type="submit">Регистрация</UButton>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <p class="login-question">
      Уже зарегистрированы?
      <RouterLink to="login">Войти</RouterLink>
    </p>
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

.login-question {
  font-size: 12px;
}
</style>
