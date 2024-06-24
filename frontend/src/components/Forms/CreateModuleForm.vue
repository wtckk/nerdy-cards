<template>
  <form @submit.prevent="submit">
    <h1>Создание модуля</h1>
    <input
      class="input"
      type="text"
      name="title"
      placeholder="Название модуля..."
      minlength="4"
      maxlength="32"
      v-model="title"
    />
    <textarea
      class="input description"
      type="text"
      name="description"
      placeholder="Описание модуля..."
      maxlength="200"
      v-model="description"
    />

    <CreateModuleCards :cards="cards" @add-card="addCard" @delite-card="deliteCard" />

    <button type="submit" class="btn">Создать</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CreateModuleCards from '@/components/Forms/CreateModuleCards.vue'

import { useModuleStore } from '@/stores/ModulesStore'

import router from '@/router'
import { Card } from '@/domain/Module'

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
  background-color: #4B2A81;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px;
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
  padding-bottom: 80px;
}

textarea {
  color: white;
}

</style>
