<template>
  <PageLayout>
    <div class="module">
      <h1>{{ module?.title }}</h1>

      <div class="module-screen"></div>

      <button class="btn module-start-btn">Пройти</button>

      <div class="module-profile">
        <RouterLink :to="`/profile/${module?.profile.id}`" class="profile-link">
          <img
            :src="module?.profile.avatarUrl"
            height="30px"
            width="30px"
            style="border-radius: 50%"
            alt=""
          />

          <span>{{ module?.profile.username }}</span>
        </RouterLink>

        <div v-if="userStore.user?.username === module?.profile.username">
          <button v-if="!module?.isPublic" @click="publishModule">Опубликовать</button>
          <button v-else @click="publishModule">Скрыть</button>
          <button v-if="!isEditing" @click="editCards">edit</button>
          <button v-else @click="updateCards(editedCards)">save</button>
        </div>
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <ModuleCardsBlock v-if="module && module.cards && !isEditing" :cards="module.cards" />
      <ModuleCardsEdit
        v-if="isEditing"
        v-model="editedCards"
        @delite-card="deleteCard"
        @add-card="createCard"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import router from '@/router'

import PageLayout from '@/components/Layouts/PageLayout.vue'

import ModuleCardsBlock from '@/views/ModulePage/ModuleCardsBlock.vue'
import ModuleCardsEdit from '@/views/ModulePage/ModuleCardsEdit.vue'

import { Card, Module } from '@/domain/Module'

import { useModuleStore } from '@/stores/ModulesStore'
import { useUserStore } from '@/stores/UserStore'

const moduleStore = useModuleStore()
const userStore = useUserStore()

const module = ref<Module>()

const isEditing = ref(false)

const editedCards = ref<Card[]>([])
const createdCards = ref<Card[]>([])

const errorMessage = ref('')

function editCards() {
  isEditing.value = true
  if (module.value?.cards) {
    editedCards.value = module.value.cards
  }
}

// function addCard() {
//   editedCards.value.push({
//     id: '',
//     term: '',
//     definition: '',
//     position: editedCards.value.length + 1
//   })
// }

async function deleteCard(deletedCard: Card) {
  const response = await moduleStore.removeCard(deletedCard.id)

  if (response instanceof Error) {
    errorMessage.value = 'Произошла ошибка при удалении карточки. Пожалуйста, попробуйте снова.'
  } else {
    editedCards.value = editedCards.value.filter((card) => deletedCard.id !== card.id)

    editedCards.value.forEach((card, index) => {
      card.position = index + 1
    })
  }
}

async function createCard() {
  const id = String(router.currentRoute.value.params.id)
  const newCards = [
    {
      id: '',
      term: '',
      definition: '',
      position: editedCards.value.length + 1
    }
  ]

  const response = await moduleStore.createCards(id, newCards)

  if (response instanceof Error) {
    errorMessage.value = 'Произошла ошибка при добавлении карточки. Пожалуйста, попробуйте снова.'
  } else {
    newCards[0].id = response[0].id
    editedCards.value.push(...newCards)
    console.log(editedCards)
  }
}

async function updateCards(cards: Card[]) {
  let isFiff = true
  errorMessage.value = ''

  for (const card of editedCards.value) {
    if (!card.term || !card.definition) {
      isFiff = false
      errorMessage.value = 'Заполните все поля карточек, пожалуйста.'
      return
    }
  }

  if (isFiff) {
    const response = await moduleStore.updateCards(cards)

    if (response instanceof Error) {
      errorMessage.value = 'Произошла ошибка при сохранении карточек. Пожалуйста, попробуйте снова.'
    } else {
      if (module.value?.cards) {
        module.value.cards = cards
        isEditing.value = false
      }
    }
  }
}

async function publishModule() {
  const id = String(router.currentRoute.value.params.id)

  const response = await moduleStore.publishModule(id)

  if (response instanceof Error) {
    errorMessage.value =
      'Произошла ошибка при изменении статуса модуля. Пожалуйста, попробуйте снова.'
  } else {
    if (module.value) {
      module.value.isPublic = !module.value.isPublic
    }
  }
}

onMounted(async () => {
  const id = String(router.currentRoute.value.params.id)
  const moduleOrError = await moduleStore.getModuleById(id)

  if (moduleOrError instanceof Error) {
    console.error('Error fetching module:', moduleOrError)
  } else {
    if (moduleOrError) {
      module.value = moduleOrError
    }
  }
})
</script>

<style scoped>
.module {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
}

.module h1 {
  margin: 0;
}

.module-screen {
  width: 100%;
  height: 300px;

  background-color: var(--basic-purple);
  border-radius: 18px;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 12px;
}

.module-start-btn {
  align-self: flex-end;
}

.module-profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  padding: 20px;

  border: 1px solid var(--basic-purple);
  border-radius: 18px;
}
</style>
