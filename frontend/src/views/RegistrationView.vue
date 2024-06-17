<template>
  <FormLayout>
    <form @submit.prevent="submit">
      <input
        class="input"
        type="text"
        name="username"
        placeholder="learner1225"
        v-model="username"
      />
      <input class="input" type="email" name="email" placeholder="email@mail.com" v-model="email" />
      <input
        class="input"
        type="password"
        name="password"
        placeholder="bE23******"
        v-model="password"
      />

      <button type="submit" class="btn">Регистрация</button>

      <RouterLink to="login">Войти</RouterLink>
    </form>
  </FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FormLayout from '@/components/Layouts/FormLayout.vue'

import { useUserStore } from '@/stores/UserStore'

import router from '@/router'

const userStore = useUserStore()

const username = ref('')
const email = ref('')
const password = ref('')

function submit() {
  userStore.regUser(username.value, email.value, password.value)
  router.push('/')
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
