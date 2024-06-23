<template>
  <div class="cards">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <div class="card-top">
        #{{ card.position }}

        <button type="button" @click="$emit('deliteCard', card.position)">delite</button>
      </div>

      <div class="card-inputs">
        <input type="text" placeholder="термин" maxlength="255" v-model="card.term" />
        <input type="text" placeholder="определение" maxlength="255" v-model="card.definition" />
      </div>
    </div>

    <button type="button" @click="$emit('addCard')">add</button>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/domain/Module'

defineProps<{
  cards: Card[]
}>()

defineEmits(['deliteCard', 'addCard'])
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background-color: var(--basic-purple);
  padding: 20px;
  border-radius: 16px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-inputs {
  display: flex;
}
</style>
