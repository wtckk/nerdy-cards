<template>
  <FormLayout>
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

      <RouterLink to="registration">Регистрация</RouterLink>
    </form>
  </FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FormLayout from '@/components/Layouts/FormLayout.vue'

import { useUserStore } from '@/stores/UserStore'

import router from '@/router'

const userStore = useUserStore()

const email = ref('')
const password = ref('')

async function submit() {
  await userStore.loginUser(email.value, password.value)

  router.push('/')
}
</script>

<style scoped>
form {
  display: flex !important;
  flex-direction: column;
  gap: 24px;
}
</style>
