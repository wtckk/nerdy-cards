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

    <div class="nav-btns">
      <UButton v-if="isLearning" @click="forgot"> не помню </UButton>

      <UButton
        v-else
        :disabled="currentCardIndex == 0"
        @click="currentCardIndex--, (isFlipped = false)"
        size="small"
      >
        prev
      </UButton>

      <span>{{ currentCardIndex + 1 }}/{{ cards.length }}</span>

      <UButton v-if="isLearning && progressCards?.length" @click="learn"> помню </UButton>

      <UButton
        v-else
        :disabled="currentCardIndex + 1 == cards.length"
        @click="currentCardIndex++, (isFlipped = false)"
        size="small"
      >
        next
      </UButton>
    </div>

    <UButton v-if="!isLearning" @click="start" className="screen-btn"> Изучить </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Card, progressCard } from '@/domain/Module'

import CardService from '@/services/CardService'

const progressCards = defineModel<progressCard[]>()

const isFlipped = ref(false)
const currentCardIndex = ref(0)

const props = defineProps<{
  cards: Card[]
  profileId: string
  isLearning: boolean
}>()

const emits = defineEmits(['startLearning', 'saveProgress'])

function learn() {
  if (progressCards.value) {
    progressCards.value[currentCardIndex.value].isLearned = true
    if (currentCardIndex.value + 1 != props.cards.length) {
      currentCardIndex.value++
    } else {
      console.log('dfsef')
      save()
    }
  }
}

function forgot() {
  if (progressCards.value) {
    progressCards.value[currentCardIndex.value].isLearned = false
    if (currentCardIndex.value + 1 != props.cards.length) {
      currentCardIndex.value++
    } else {
      console.log('dfsef')
      save()
    }
  }
}

async function save() {
  if (progressCards.value) {
    await CardService.createProgressCards(props.profileId, progressCards.value)

    emits('saveProgress', progressCards.value)

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
