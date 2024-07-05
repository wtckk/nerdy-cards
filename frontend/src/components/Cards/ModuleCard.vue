<template>
  <RouterLink
    :to="`/modules/${card.id}`"
    v-if="userStore.user?.username === profile.username || card.isPublic"
  >
    <div class="card">
      <div class="card-top">
        <div class="top-title">
          <span :title="card.title">{{ card.title }}</span>

          <span v-if="card.cardCount" class="top-counter">{{ card.cardCount }} термин</span>
        </div>

        <img v-if="!card.isPublic" src="/icons/isPublic.svg" alt="" />
      </div>

      <div class="card-bottom">
        <div class="card-user">
          <UMiniAvatar :avatar-url="profile.avatarUrl" />

          <p>{{ profile.username }}</p>
        </div>

        <div class="card-like">
          <img src="/icons/like-fill.svg" alt="like" />

          <span>{{ card.likeCount }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { Module } from '@/domain/Module'
import { Profile } from '@/domain/User'

import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()

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
  width: 250px;
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
  align-items: start;
  justify-content: space-between;

  opacity: 0.6;
}

.top-title {
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
}

.top-title span:first-of-type {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
}

.top-counter {
  background-color: var(--background);
  padding: 2px 8px;
  border-radius: 50px;
  font-size: 14px;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-like {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.card-like img {
  width: 20px;
  height: 20px;
}
</style>
