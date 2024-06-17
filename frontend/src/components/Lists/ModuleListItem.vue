<template>
  <div class="item">
    <p>{{ type }}</p>
    <div class="item-cards custom-scrollbar">
      <ModuleCard v-for="module in filteredModulst" :key="module.id" :card="module" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Module, ModulesType } from '@/domain/Module'

import ModuleCard from '@/components/Cards/ModuleCard.vue'

import { useModuleStore } from '@/stores/ModulesStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()

const { search } = storeToRefs(moduleStore)

const props = defineProps<{
  type: ModulesType
  modules: Module[]
}>()

const filteredModulst = computed(() => {
  let modules = props.modules

  if (search.value) {
    modules = modules.filter((module) =>
      module.title.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (props.type === 'New') {
    modules
  } else if (props.type === 'My') {
    modules = modules.filter((module) => module.userId === moduleStore.user.id)
  } else {
    console.log('ModuleListItem: неизвестный тип модуля')
  }

  return modules
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
