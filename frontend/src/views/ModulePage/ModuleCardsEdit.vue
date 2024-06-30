<template>
  <div>
    <div v-for="card in cards" :key="card.id" class="card">
      <UInput placeholder="термин" v-model="card.term" />
      <UInput placeholder="определение" v-model="card.definition" />
      <UIconButton
        @click="$emit('deliteCard', card)"
        background="var(--basic-purple)"
        iconUrl="/icons/cross.svg"
        size="small"
        >delete</UIconButton
      >
    </div>
    <UIconButton
      @click="$emit('addCard')"
      background="var(--basic-purple)"
      iconUrl="/icons/plus.svg"
      class="card-add"
      >add</UIconButton
    >
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

.card-add {
  margin: 12px auto;
}
</style>
