<template>
  <FormLayout>
    <form @submit.prevent="submit">
      <input
        class="input"
        type="text"
        name="title"
        placeholder="Название модуля..."
        v-model="title"
      />
      <input
        class="input"
        type="text"
        name="description"
        placeholder="Описание модуля..."
        v-model="description"
      />

      <button type="submit" class="btn">Создать</button>
    </form>
  </FormLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FormLayout from '@/components/Layouts/FormLayout.vue'

import { useModuleStore } from '@/stores/ModulesStore'

import router from '@/router'

const moduleStore = useModuleStore()

const title = ref('')
const description = ref('')

function submit() {
  moduleStore.createModule(title.value, description.value)
  router.push('/')
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
