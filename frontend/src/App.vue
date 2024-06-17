<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useUserStore } from './stores/UserStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.refreshToken()
})
</script>

<style scoped></style>
