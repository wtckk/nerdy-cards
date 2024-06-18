<template>
  <div class="card">
    <div>
      <p>{{ card.title }}</p>
    </div>

    <div>
      <p>{{ card.profile.username }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Module } from '@/domain/Module'

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
</style>
