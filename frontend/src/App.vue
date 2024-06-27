<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useUserStore } from './stores/UserStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  if (localStorage.getItem('token')) {
    await userStore.checkAuth()
  }

  if (!userStore.myProfile) {
    await userStore.getUserProfile(String(userStore.user?.id))
  }
})
</script>

<style scoped></style>
