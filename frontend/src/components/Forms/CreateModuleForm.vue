<template>
  <form @submit.prevent="submit">
    <h1>Создание модуля</h1>
    <UInput name="title" placeholder="Название модуля..." :min-max="[4, 32]" v-model="title" />
    <UInput
      type="textarea"
      name="description"
      placeholder="Описание модуля..."
      class="description"
      :min-max="[null, 200]"
      v-model="description"
    />

    <CreateModuleCards :cards="cards" @add-card="addCard" @delite-card="deliteCard" />

    <UButton type="submit">Создать</UButton>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CreateModuleCards from '@/components/Forms/CreateModuleCards.vue'

import { useModuleStore } from '@/stores/ModulesStore'

import router from '@/router'
import { Card } from '@/domain/Module'
import UButton from '../Global/UButton.vue'

const moduleStore = useModuleStore()

const title = ref('')
const description = ref('')

const errorMessage = ref('')

const cards = ref<Card[]>([
  {
    id: '',
    term: '',
    definition: '',
    position: 1
  }
])

function addCard() {
  cards.value.push({
    id: '',
    term: '',
    definition: '',
    position: cards.value.length + 1
  })
}

async function deliteCard(position: number) {
  cards.value = await cards.value.filter((card) => card.position !== position)

  cards.value.forEach((card, index) => {
    card.position = index + 1
  })
}

async function submit() {
  let isFiff = true
  errorMessage.value = ''

  for (const card of cards.value) {
    if (!card.term || !card.definition) {
      isFiff = false
      errorMessage.value = 'Заполните все поля карточек, пожалуйста.'
      return
    }
  }

  if (!title.value) {
    isFiff = false
    errorMessage.value = 'Заполните все поля, пожалуйста.'
    return
  }

  if (isFiff) {
    const response = await moduleStore.createModule(title.value, description.value, cards.value)

    if (response instanceof Error) {
      errorMessage.value = 'Произошла ошибка при создании модуля. Пожалуйста, попробуйте снова.'
    } else {
      router.push('/')
    }
  }
}
</script>

<style scoped>
form {
  background-color: #4b2a81;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

h1 {
  display: flex;
  justify-content: center;
  margin: 0px 0px 12px;
}

a {
  color: #a78bfa;
  font-weight: 500;
}

.description {
  height: 140px;
}
form button {
  place-self: center;
}

textarea {
  color: white;
}
</style>
