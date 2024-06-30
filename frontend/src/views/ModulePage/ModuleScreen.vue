<template>
  <div class="module-screen">
    <div class="screen" :class="{ flipped: isFlipped }" @click="isFlipped = !isFlipped">
      <div class="screen-inner">
        <div class="sreen-text screen-front" v-if="!isFlipped">
          {{ cards[currentCardIndex].term }}
          <span class="screen-type">термин</span>
        </div>
        <div class="sreen-text screen-back" v-else>
          {{ cards[currentCardIndex].definition }}<span class="screen-type">определение</span>
        </div>
      </div>
    </div>

    <div class="nav-btns">
      <UIconButton
        v-if="isLearning"
        border="var(--basic-purple)"
        @click="forgot"
        iconUrl="/icons/cross-bold.svg"
      />

      <UIconButton
        v-else
        :disabled="currentCardIndex == 0"
        @click="prev"
        class="prev"
        iconUrl="/icons/arrow-left.svg"
      />

      <span class="counter">{{ currentCardIndex + 1 }}/{{ cards.length }}</span>

      <UIconButton
        v-if="isLearning && progressCards?.length"
        border="var(--basic-purple)"
        @click="learn"
        iconUrl="/icons/check.svg"
      />

      <UIconButton
        v-else
        style="transform: rotate(180deg)"
        :disabled="currentCardIndex + 1 == cards.length"
        @click="next"
        iconUrl="/icons/arrow-left.svg"
      />
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
      isFlipped.value = false

      document.querySelector('.screen-inner')?.classList.add('swipe-up-right')
      setTimeout(() => {
        document.querySelector('.screen-inner')?.classList.remove('swipe-up-right')
      }, 500)
    } else {
      save()
    }
  }
}

function prev() {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
    isFlipped.value = false
  }
}

function forgot() {
  if (progressCards.value) {
    progressCards.value[currentCardIndex.value].isLearned = false
    if (currentCardIndex.value + 1 != props.cards.length) {
      currentCardIndex.value++
      isFlipped.value = false

      document.querySelector('.screen-inner')?.classList.add('swipe-up-left')
      setTimeout(() => {
        document.querySelector('.screen-inner')?.classList.remove('swipe-up-left')
      }, 500)
    } else {
      save()
    }
  }
}

function next() {
  if (currentCardIndex.value + 1 != props.cards.length) {
    currentCardIndex.value++
    isFlipped.value = false

    document.querySelector('.screen-inner')?.classList.add('swipe-up-right')
    setTimeout(() => {
      document.querySelector('.screen-inner')?.classList.remove('swipe-up-right')
    }, 500)
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
  width: 100%;
  height: 500px;
  perspective: 1000px;
  user-select: none;
  cursor: pointer;
}

.screen-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  transform-style: preserve-3d;
  border-radius: 18px;
  background-color: var(--basic-purple);
}

.screen.flipped .screen-inner {
  transform: rotateY(180deg);
}

.screen-front,
.screen-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.screen-back {
  color: white;
  transform: rotateY(180deg);
}

.sreen-text {
  font-size: 32px;
  font-weight: 500;
}

.swipe-up-left {
  animation: swipeUpLeft 0.5s ease-out;
}

.swipe-up-right {
  animation: swipeUpRight 0.5s ease-out;
}

@keyframes swipeUpLeft {
  from {
    transform: translateX(0) translateY(0) rotate(0);
    opacity: 1;
  }
  to {
    transform: translateX(-150%) translateY(-30%) rotate(15deg);
    opacity: 0.2;
  }
}

@keyframes swipeUpRight {
  from {
    transform: translateX(0) translateY(0) rotate(0);
    opacity: 1;
  }
  to {
    transform: translateX(150%) translateY(-30%) rotate(-15deg);
    opacity: 0.2;
  }
}

.screen-type {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 16px;
  font-weight: 200;
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

.nav-btns button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.prev:active {
  transform: translate(0em, 0em) !important;
}

.counter {
  font-size: 20px;
  font-weight: 600;
}

.screen-btn {
  align-self: flex-end;
}
</style>
