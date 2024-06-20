<template>
  <PageLayout>
    <div>
      <p>{{ module?.title }}</p>

      <div>
        <span>{{ module?.profile.username }}</span>

        <button>опубликовать</button>
        <button>edit</button>
      </div>

      <div>
        <div v-for="card in module?.cards" :key="card.id">
          <span>{{ card.term }}</span>
          <span>{{ card.definition }}</span>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import PageLayout from '@/components/Layouts/PageLayout.vue'
import { Module } from '@/domain/Module'
import { useModuleStore } from '@/stores/ModulesStore'

const moduleStore = useModuleStore()

let module = ref<Module | null>(null)

onMounted(async () => {
  const id = String(router.currentRoute.value.params.id)
  const moduleOrError = await moduleStore.getModuleById(id)

  if (moduleOrError instanceof Error) {
    console.error('Error fetching module:', moduleOrError)
  } else {
    module.value = moduleOrError
  }
})
</script>

<style scoped></style>
