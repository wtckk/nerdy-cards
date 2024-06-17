<template>
  <div>load</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import router from '@/router'

function time() {
  router.push('/')
}

onMounted(() => {
  setTimeout(time, 3000)
})
</script>

<style scoped></style>
