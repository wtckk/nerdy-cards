<template>
  <FormLayout>
    <form>
      <input class="input" type="text" name="title" v-model="newModule.title" />
      <input class="input" type="text" name="description" v-model="newModule.description" />

      <button @click="submit" type="submit" class="btn">Создать</button>
    </form>
  </FormLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import FormLayout from '@/components/Layouts/FormLayout.vue'
import { Module } from '@/domain/Module'

import { useModuleStore } from '@/stores/ModulesStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()
const { user } = storeToRefs(moduleStore)

const newModule = reactive<Module>({
  id: '',
  title: '',
  description: '',
  user: user.value,
  createdAt: new Date(''),
  updatedAt: new Date('')
})

function submit() {
  moduleStore.createModule(newModule)
}
</script>

<style scoped></style>
