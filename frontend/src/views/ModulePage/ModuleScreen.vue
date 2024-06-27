<template>
  <div class="module-screen">
    <div class="screen" @click="isFlipped = !isFlipped">
      <div v-if="progressCards?.length">
        <div v-if="!isFlipped">{{ cards[currentCardIndex].term }}</div>
        <div v-else>{{ cards[currentCardIndex].definition }}</div>
      </div>
    </div>

    <div v-if="progressCards?.length" class="learn-btns">
      <UButton @click="learn" size="large">помню</UButton>
      <UButton @click="forgot" size="large">не помню</UButton>
    </div>

    <div v-if="progressCards?.length" class="nav-btns">
      <UButton :disabled="currentCardIndex == 0" @click="currentCardIndex--" size="small">
        prev
      </UButton>

      <span>{{ currentCardIndex + 1 }}/{{ cards.length }}</span>

      <UButton
        :disabled="currentCardIndex + 1 == cards.length"
        @click="currentCardIndex++"
        size="small"
      >
        next
      </UButton>
    </div>

    <UButton v-if="progressCards?.length && currentCardIndex + 1 == cards.length" @click="save">
      на бекенд
    </UButton>

    <UButton @click="$emit('startLearning')" className="module-start-btn">Пройти</UButton>
  </div>
</template>

<script setup lang="ts">
import { Card, progressCard } from '@/domain/Module'
import CardService from '@/services/CardService'
import { ref } from 'vue'

const progressCards = defineModel<progressCard[]>()

const isFlipped = ref(false)
const currentCardIndex = ref(0)

const props = defineProps<{
  cards: Card[]
  profileId: string
}>()

defineEmits(['startLearning'])

function learn() {
  if (progressCards.value) {
    progressCards.value[currentCardIndex.value].isLearned = true
  }
}

function forgot() {
  if (progressCards.value) {
    progressCards.value[currentCardIndex.value].isLearned = false
  }
}

async function save() {
  if (progressCards.value) {
    await CardService.createProgressCards(props.profileId, progressCards.value)
  }
}
</script>

<style scoped>
.module-screen {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}

.screen {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;
  background-color: var(--basic-purple);
  border-radius: 18px;
}

.learn-btns {
  display: flex;
  gap: 24px;
  place-self: center;
}

.nav-btns {
  display: flex;
  align-items: center;
  gap: 12px;
  place-self: center;
}

.module-start-btn {
  align-self: flex-end;
}
</style>
