<template>
  <PageLayout>
    <div class="profile">
      <div class="profile-top">
        <ProfileInfo />

        <div class="profile-stats">stats</div>
      </div>

      <div class="item-cards custom-scrollbar">
        <ModuleCard
          v-for="folder in profile?.folders"
          :key="folder.id"
          :card="folder"
          :profile="profile"
        />
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import router from '@/router'

import PageLayout from '@/components/Layouts/PageLayout.vue'

import ModuleCard from '@/components/Cards/ModuleCard.vue'
import ProfileInfo from '@/views/ProfilePage/ProfileInfo.vue'

import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const profileId = String(router.currentRoute.value.params.id)

onMounted(() => {
  userStore.getProfile(profileId)
})
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.profile-top {
  display: flex;
  gap: 24px;
}

.profile-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 24px 48px;
  border-radius: 18px;
  width: 50%;

  background-color: var(--basic-purple);
}

.item-cards {
  display: flex;
  gap: 24px;
  padding: 10px;
}

.custom-scrollbar {
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--basic-purple) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--dark-purple);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
