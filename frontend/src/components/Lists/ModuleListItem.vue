<template>
  <div class="item">
    <p>{{ type }}</p>
    <div class="item-cards custom-scrollbar">
      <ModuleCard v-for="module in filteredModulst" :key="module.id" :card="module" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Module, ModulesType } from '@/domain/Module'

import ModuleCard from '@/components/Cards/ModuleCard.vue'

import { useModuleStore } from '@/stores/ModulesStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()

const { search } = storeToRefs(moduleStore)

const props = defineProps<{
  type: ModulesType
}>()

const modules = ref<Module[]>([])

const filteredModulst = computed(() => {
  return modules.value.filter((module) =>
    module.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

onMounted(() => {
  if (props.type === 'My') {
    modules.value = moduleStore.getMyModules
  } else if (props.type === 'New') {
    modules.value = moduleStore.getNewModules
  } else {
    console.error('ModuleListItem.vue: Unknown type')
  }
})
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-cards {
  display: flex;
  gap: 24px;
  padding: 10px;
}

.custom-scrollbar {
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--basic-purple) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--dark-purple);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
