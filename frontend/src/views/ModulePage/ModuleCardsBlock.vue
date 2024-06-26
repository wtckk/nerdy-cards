<template>
  <div class="module-cards">
    <div class="cards-top">
      <span> количество терминов: {{ cards.length }} </span>

      <UButton>sort</UButton>
    </div>

    <div v-for="category in ['Изучено', 'Не изучено']" :key="category" class="cards-block">
      <p>{{ category }}</p>

      <div
        v-for="card in cards"
        :key="card.id"
        class="card"
        :style="category === 'Изучено' ? 'background-color: #C9ECA6' : 'background-color: #FFBEBE'"
      >
        <span>{{ card.term }} </span>
        <span>{{ card.definition }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/domain/Module'

defineProps<{
  cards: Card[]
}>()
</script>

<style scoped>
.module-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.cards-top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.cards-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;

  border-radius: 12px;
  color: black;
  font-weight: 400;
}

.card span {
  width: 50%;
  padding: 2px 8px;
}

.card span:first-of-type {
  border-right: 2px solid black;
}

@media (min-width: 1300px) {
  .cards-block {
    width: 50%;
  }
}
</style>
