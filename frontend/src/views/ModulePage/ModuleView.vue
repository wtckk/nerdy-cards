<template>
  <PageLayout>
    <div v-if="!isLoading" class="module">
      <h1>{{ module?.title }}</h1>

      <ModuleScreen
        :cards="module?.cards ? module.cards : []"
        :is-learning="inLearning"
        :profile-id="String(userStore.myProfile?.id)"
        v-model="progressCards"
        @start-learning="startLearning"
        @save-progress="saveProgress"
      />

      <div class="module-profile">
        <RouterLink :to="`/profile/${module?.profile.id}`" class="profile-link">
          <UMiniAvatar :avatar-url="module?.profile.avatarUrl" />

          <span>{{ module?.profile.username }}</span>
        </RouterLink>

        <div v-if="isLearnedCount">
          прогресс модуля: {{ (isLearnedCount / (module?.cards?.length || 0)) * 100 }}%
        </div>

        <div v-if="userStore.user?.username === module?.profile.username" class="profile-btns">
          <UButton @click="togglePublishModule">
            {{ module?.isPublic ? 'Скрыть' : 'Опубликовать' }}
          </UButton>
          <UButton v-if="!isEditing" :disabled="progressCards.length" @click="toggleEditCards"
            >edit</UButton
          >
          <UButton v-else @click="updateCards">save</UButton>
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

    <div v-else>загрузка</div>
  </PageLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import PageLayout from '@/components/Layouts/PageLayout.vue'

import ModuleCardsBlock from '@/views/ModulePage/ModuleCardsBlock.vue'
import ModuleCardsEdit from '@/views/ModulePage/ModuleCardsEdit.vue'
import ModuleScreen from '@/views/ModulePage/ModuleScreen.vue'

import { Card, Module, progressCard } from '@/domain/Module'

import { useModuleStore } from '@/stores/ModulesStore'
import { useUserStore } from '@/stores/UserStore'

const moduleStore = useModuleStore()
const userStore = useUserStore()

const route = useRoute()
const moduleId = String(route.params.id)

const isEditing = ref(false)
const inLearning = ref(false)

const module = ref<Module>()
const editedCards = ref<Card[]>([])
const progressCards = ref<progressCard[]>([])

const errorMessage = ref('')

const isLoading = computed(() => !module.value)

const isLearnedCount = computed(() => {
  if (module.value?.cards) {
    const count = module.value.cards.filter((card) => card.isLearned).length
    console.log(count)
    return count
  }
  return 0
})

async function startLearning() {
  if (module.value?.cards) {
    progressCards.value = await module.value.cards.map((card) => ({
      id: card.id,
      isLearned: card.isLearned ? true : false
    }))

    inLearning.value = true
  }
}

function toggleEditCards() {
  isEditing.value = !isEditing.value
  if (isEditing.value && module.value?.cards) {
    editedCards.value = [...module.value.cards]
  }
}

async function deleteCard(deletedCard: Card) {
  const response = await moduleStore.removeCard(deletedCard.id)

  if (response instanceof Error) {
    errorMessage.value = 'Произошла ошибка при удалении карточки. Пожалуйста, попробуйте снова.'
  } else {
    editedCards.value = editedCards.value.filter((card) => deletedCard.id !== card.id)
    updateCardPositions()
  }
}

async function createCard() {
  const newCard = {
    id: '',
    term: '',
    definition: '',
    position: editedCards.value.length + 1,
    isLearned: false
  }

  const response = await moduleStore.createCards(moduleId, [newCard])

  if (response instanceof Error) {
    errorMessage.value = 'Произошла ошибка при добавлении карточки. Пожалуйста, попробуйте снова.'
  } else {
    newCard.id = response[0].id
    editedCards.value.push(newCard)
  }
}

async function updateCards() {
  if (editedCards.value.some((card) => !card.term || !card.definition)) {
    errorMessage.value = 'Заполните все поля карточек, пожалуйста.'
    return
  }
  console.log(editedCards.value)
  const response = await moduleStore.updateCards(editedCards.value)
  if (response instanceof Error) {
    errorMessage.value = 'Произошла ошибка при сохранении карточек. Пожалуйста, попробуйте снова.'
  } else {
    if (module.value?.cards) {
      module.value.cards = [...editedCards.value]
      isEditing.value = false
    }
  }
}

async function togglePublishModule() {
  const response = await moduleStore.publishModule(moduleId)
  if (response instanceof Error) {
    errorMessage.value =
      'Произошла ошибка при изменении статуса модуля. Пожалуйста, попробуйте снова.'
  } else {
    if (module.value) {
      module.value.isPublic = !module.value.isPublic
    }
  }
}

function updateCardPositions() {
  editedCards.value.forEach((card, index) => {
    card.position = index + 1
  })
}

function saveProgress(progressCards: progressCard[]) {
  if (module.value?.cards) {
    module.value.cards = module.value.cards.map((card) => {
      const progressCard = progressCards.find((pc) => pc.id === card.id)
      if (progressCard) {
        card.isLearned = progressCard.isLearned
      }
      return card
    })

    inLearning.value = false
  }
}

onMounted(async () => {
  const moduleOrError = await moduleStore.getModuleById(moduleId, String(userStore.myProfile?.id))

  if (moduleOrError instanceof Error) {
    console.error('Ошибка при получении модуля:', moduleOrError)
  } else {
    module.value = moduleOrError
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

.profile-link {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-btns {
  display: flex;
  align-items: center;
  gap: 12px;
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
