<template>
  <div class="item" v-if="filteredModulst.length">
    <p>{{ type }}</p>
    <div class="item-cards custom-scrollbar">
      <ModuleCard v-for="module in filteredModulst" :key="module.id" :card="module" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import { Module, ModulesType } from '@/domain/Module'

import ModuleCard from '@/components/Cards/ModuleCard.vue'

import { useModuleStore } from '@/stores/ModulesStore'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()
const userStore = useUserStore()

const { search } = storeToRefs(moduleStore)
const { user } = storeToRefs(userStore)

const props = defineProps<{
  type: ModulesType
}>()

const localModules = ref<Module[]>([])

const filteredModulst = computed(() => {
  let modules = localModules.value

  if (search.value) {
    modules = modules.filter((module) =>
      module.title.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  return modules
})

onMounted(async () => {
  console.log('modules')
  if (user.value?.id) {
    let modules: Module[] | Error

    if (props.type === 'My') {
      modules = await moduleStore.getUserModules(user.value.id)
    } else if (props.type === 'New') {
      modules = await moduleStore.getModules()
      console.log(modules)
    } else {
      console.log('ModuleListItem: неизвестный тип модуля')
      return
    }

    if (modules instanceof Error) {
      console.error('Произошла ошибка при получении модулей:', modules)
    } else {
      localModules.value = modules
    }
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
