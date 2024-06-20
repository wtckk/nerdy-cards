<template>
  <PageLayout v-if="!userStore.isLoading">
    <ModuleList />
  </PageLayout>
  <div v-else class="loader">загрузка...</div>
</template>

<script setup lang="ts">
import PageLayout from '@/components/Layouts/PageLayout.vue'
import ModuleList from '@/components/Lists/ModuleList.vue'

import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  font-family: 900;
  font-size: 28px;
}
</style>
