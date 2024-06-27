<template>
  <div class="module-screen">
    <div class="screen" @click="isFlipped = !isFlipped">
      <div>
        <div class="sreen-text" v-if="!isFlipped">
          {{ cards[currentCardIndex].term }}
        </div>
        <div class="sreen-text" v-else>{{ cards[currentCardIndex].definition }}</div>
        <span class="screen-type">{{ !isFlipped ? 'термин' : 'определение' }}</span>
      </div>
    </div>

    <div v-if="progressCards?.length" class="learn-btns">
      <UButton @click="learn" :disabled="progressCards[currentCardIndex].isLearned" size="large"
        >помню</UButton
      >
      <UButton @click="forgot" size="large">не помню</UButton>
    </div>

    <div class="nav-btns">
      <UButton
        :disabled="currentCardIndex == 0"
        @click="currentCardIndex--, (isFlipped = false)"
        size="small"
      >
        prev
      </UButton>

      <span>{{ currentCardIndex + 1 }}/{{ cards.length }}</span>

      <UButton
        :disabled="currentCardIndex + 1 == cards.length"
        @click="currentCardIndex++, (isFlipped = false)"
        size="small"
      >
        next
      </UButton>
    </div>

    <UButton
      v-if="progressCards?.length && currentCardIndex + 1 == cards.length"
      @click="save"
      className="screen-btn"
    >
      завершить
    </UButton>

    <UButton v-if="!progressCards?.length" @click="start" className="screen-btn"> Изучить </UButton>
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

const emits = defineEmits(['startLearning'])

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

    progressCards.value = []

    currentCardIndex.value = 0
  }
}

function start() {
  currentCardIndex.value = 0
  isFlipped.value = false
  emits('startLearning')
}
</script>

<style scoped>
.module-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;

  width: 100%;
  height: 400px;
  background-color: var(--basic-purple);
  border-radius: 18px;
  user-select: none;

  transition: transform 0.3s;
}

.sreen-text {
  font-size: 32px;
  font-weight: 500;
  padding: 12px 24px;
}
.screen-type {
  position: absolute;
  top: 12px;
  left: 12px;
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

.screen-btn {
  align-self: flex-end;
}
</style>
