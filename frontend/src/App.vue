<template>
  <RouterView v-if="!userStore.isLoading" />
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
})
</script>

<style scoped></style>
