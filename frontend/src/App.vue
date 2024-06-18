<template>
  <h1>{{ userStore.isAuth }}</h1>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useUserStore } from './stores/UserStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  if (localStorage.getItem('token')) {
    userStore.checkAuth()
  }
})
</script>

<style scoped></style>
