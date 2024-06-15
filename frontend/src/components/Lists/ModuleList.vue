<template>
  <div class="list">
    <ModuleListItem v-for="type in types" :key="type" :type="type" />
  </div>
</template>

<script setup lang="ts">
import ModuleListItem from '@/components/Lists/ModuleListItem.vue'

import { ModulesType } from '@/domain/Module'

const types: ModulesType[] = ['New', 'My']
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
</style>
