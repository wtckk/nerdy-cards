<template>
  <div class="item" v-if="(filteredModules.length || type == 'My') && userStore.user">
    <p>{{ type }}</p>
    <div class="item-cards custom-scrollbar">
      <AddCard v-if="isAdd && type === 'My'" />

      <ModuleCard
        v-for="module in filteredModules"
        :key="module.id"
        :card="module"
        :profile="module.profile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import { Module, ModulesType } from '@/domain/Module'

import ModuleCard from '@/components/Cards/ModuleCard.vue'
import AddCard from '@/components/Cards/AddCard.vue'

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
const isAdd = ref(false)

const filteredModules = computed(() => {
  let modules = localModules.value

  if (search.value) {
    modules = modules.filter((module) =>
      module.title.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (props.type === 'My' && !userStore.user) {
    modules = []
  }

  return modules
})
onMounted(async () => {
  if (user.value?.id) {
    let modules: Module[] | Error = []

    if (props.type === 'My') {
      isAdd.value = true
      const response = await moduleStore.getUserModules(user.value.id)
      if (response) {
        modules = response
      }
    } else if (props.type === 'New') {
      isAdd.value = false
      const response = await moduleStore.getModules()
      if (response) {
        modules = response
      }
    } else {
      console.log('ModuleListItem: неизвестный тип модуля')
      return
    }

    if (Array.isArray(modules)) {
      localModules.value = modules
    } else {
      console.error('Error fetching modules:', (modules as Error).message)
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
