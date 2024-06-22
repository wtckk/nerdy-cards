<template>
  <div>
    <div v-for="card in cards" :key="card.id" class="card">
      <span>#{{ card.position }}</span>
      <input class="input" type="text" placeholder="термин" v-model="card.term" />
      <input class="input" type="text" placeholder="определение" v-model="card.definition" />
      <button @click="$emit('deliteCard', card)">delete</button>
    </div>
    <button @click="$emit('addCard')">add</button>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/domain/Module'

const cards = defineModel<Card[]>()

defineEmits(['addCard', 'deliteCard'])
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;

  border-radius: 12px;
  color: black;
  font-weight: 400;
}
</style>
