<template>
  <RouterLink :to="`/modules/${card.id}`">
    <div class="card">
      <div class="card-top">
        <div>
          {{ card.title }}

          <span v-if="card.cardCount" class="top-counter">{{ card.cardCount }}</span>
        </div>

        <img v-if="!card.isPublic" src="/icons/isPublic.svg" alt="" />
      </div>

      <div class="card-user">
        <img
          :src="profile.avatarUrl"
          height="30px"
          width="30px"
          style="border-radius: 50%"
          alt=""
        />
        <p>{{ profile.username }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Module } from '@/domain/Module'
import { Profile } from '@/domain/User'
import { RouterLink } from 'vue-router'

defineProps<{
  card: Module
  profile: Profile
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

.top-counter {
  background-color: var(--dark-purple);
  padding: 2px 8px;
  border-radius: 50px;
}

.card-user {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
