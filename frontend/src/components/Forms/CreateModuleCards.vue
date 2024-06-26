<template>
  <div class="cards">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <div class="card-top">
        #{{ card.position }}

        <UIconButton
          @click="$emit('deliteCard', card.position)"
          iconUrl="/icons/cross.svg"
          size="small"
          className="cross"
        />
      </div>

      <div class="card-inputs">
        <textarea type="text" placeholder="термин" maxlength="255" v-model="card.term" />
        <textarea type="text" placeholder="определение" maxlength="255" v-model="card.definition" />
      </div>
    </div>

    <UIconButton
      @click="$emit('addCard')"
      iconUrl="/icons/plus.svg"
      background="transparent"
      className="add-card"
    />
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
  gap: 12px;
}

.card {
  background-color: var(--basic-purple);
  padding: 0px 20px 20px 20px;
  border-radius: 12px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--background);
  font-weight: 800;
  font-size: 20px;
  border-bottom: 3px solid rgb(96, 53, 165, 0.5);
}

.card-inputs {
  display: flex;
}

.card-inputs textarea {
  width: 50%;
  padding: 8px;
  height: 128px;
  color: white;
}

.card-inputs textarea:first-of-type {
  border-right: 3px solid rgb(96, 53, 165, 0.5);
}

::placeholder {
  font-size: 16px;
}

.add-card {
  place-self: center;
}

.cross {
  margin: 10px;
}
</style>
