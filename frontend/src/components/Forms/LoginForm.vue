<template>
  <form @submit.prevent="submit">
    <input class="input" type="email" name="email" placeholder="email@mail.com" v-model="email" />
    <input
      class="input"
      type="password"
      name="password"
      placeholder="tN1v******"
      v-model="password"
    />

    <button type="submit" class="btn">Войти</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <RouterLink to="registration">Регистрация</RouterLink>
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
  if (email.value && password.value) {
    try {
      await userStore.loginUser(email.value, password.value)
      router.push('/')
    } catch (error) {
      errorMessage.value = 'Данные неверны. Пожалуйста, попробуйте снова.'
    }
  } else {
    errorMessage.value = 'Заполните все поля, пожалуйста.'
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.error-message {
  color: red;
  margin-top: 0;
}
</style>
