<template>
  <div class="cards">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <div class="card-top">
        #{{ card.position }}

        <button class="cross btn-circle" type="button" @click="$emit('deliteCard', card.position)">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
              fill="#E1E1E1" />
          </svg>
        </button>
      </div>

      <div class="card-inputs">
        <textarea type="text" placeholder="термин" maxlength="255" v-model="card.term" />
        <textarea type="text" placeholder="определение" maxlength="255" v-model="card.definition" />
      </div>
    </div>

    <button class='add-card btn-circle' type="button" @click="$emit('addCard')">
      <svg width="25" height="25" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.375 25.625H0.625V19.375H19.375V0.625H25.625V19.375H44.375V25.625H25.625V44.375H19.375V25.625Z"
          fill="#E1E1E1" />
      </svg>
    </button>

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
  border-bottom: 3px solid rgb(96, 53, 165, 0.5) ;
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

.cross{
 width: 35px;
 height: 35px;
 margin: 10px;
}

</style>
