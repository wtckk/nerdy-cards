<template>
  <PageLayout>
    <h1>Профиль {{ profile?.username }}</h1>
    <div v-if="!isLoading" class="profile">
      <div class="profile-top">
        <ProfileInfo />

        <div class="profile-stats">stats</div>
      </div>
      <h2 v-if="profile?.folders?.length">Модули</h2>
      <div v-if="profile" class="item-cards custom-scrollbar">
        <AddCard v-if="userStore.user?.username === profile.username" />

        <ModuleCard
          v-for="folder in profile.folders"
          :key="folder.id"
          :card="folder"
          :profile="profile"
        />
      </div>
    </div>

    <div v-else>загрузка</div>
  </PageLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { useRoute } from 'vue-router'

import PageLayout from '@/components/Layouts/PageLayout.vue'
import ModuleCard from '@/components/Cards/ModuleCard.vue'
import ProfileInfo from '@/views/ProfilePage/ProfileInfo.vue'
import AddCard from '@/components/Cards/AddCard.vue'

import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const route = useRoute()

const isLoading = computed(() => !profile.value)

const profileId = computed(() => {
  return String(route.params.id)
})

watch(profileId, () => {
  userStore.getProfile(profileId.value)
})

onMounted(() => {
  try {
    userStore.getProfile(profileId.value)
  } catch (err) {
    console.log(err)
  }
})
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
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

h2 {
  margin: 18px 0px 8px 0px;
}
</style>
