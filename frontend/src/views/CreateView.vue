<template>
  <FormLayout>
    <form @submit.prevent="submit">
      <input class="input" type="text" name="title" v-model="title" />
      <input class="input" type="text" name="description" v-model="description" />

      <button type="submit" class="btn">Создать</button>
    </form>
  </FormLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import FormLayout from '@/components/Layouts/FormLayout.vue'
import { Module } from '@/domain/Module'

import { useModuleStore } from '@/stores/ModulesStore'
import { storeToRefs } from 'pinia'
import router from '@/router'

const moduleStore = useModuleStore()
const { user } = storeToRefs(moduleStore)

const title = ref('')
const description = ref('')

function submit() {
  moduleStore.createModule(title.value, description.value)
  router.push('/')
}
</script>

<style scoped></style>
