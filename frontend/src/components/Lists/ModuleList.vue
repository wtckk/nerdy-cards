<template>
  <div class="list">
    <ModuleListItem v-for="type in types" :key="type" :type="type" :modules="modules" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import ModuleListItem from '@/components/Lists/ModuleListItem.vue'

import { ModulesType } from '@/domain/Module'

import { useModuleStore } from '@/stores/ModulesStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()

const { modules } = storeToRefs(moduleStore)

const types: ModulesType[] = ['New', 'My']

onMounted(() => {
  moduleStore.getModules()
})
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
</style>
