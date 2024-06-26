<template>
  <div>
    <div v-for="card in cards" :key="card.id" class="card">
      <span>#{{ card.position }}</span>
      <UInput placeholder="термин" v-model="card.term" />
      <UInput placeholder="определение" v-model="card.definition" />
      <UButton @click="$emit('deliteCard', card)">delete</UButton>
    </div>
    <UButton @click="$emit('addCard')">add</UButton>
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
