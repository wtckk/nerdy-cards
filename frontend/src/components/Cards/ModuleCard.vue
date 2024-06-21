<template>
  <RouterLink :to="`/modules/${card.id}`">
    <div class="card">
      <div class="card-top">
        <p>{{ card.title }}</p>

        <img v-if="!card.isPublic" src="/icons/isPublic.svg" alt="" />
      </div>

      <div>
        <p>{{ card.profile.username }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Module } from '@/domain/Module'
import { RouterLink } from 'vue-router'

defineProps<{
  card: Module
}>()
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 250px;
  height: 150px;
  padding: 20px;
  background-color: var(--basic-purple);
  border-radius: 16px;
  opacity: 0.8;
  cursor: pointer;
}

.card:hover {
  opacity: 1;
  scale: 1.05;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  opacity: 0.6;
}
</style>
