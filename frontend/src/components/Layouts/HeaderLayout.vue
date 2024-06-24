<template>
  <header>
    <a href="/">Nerdy cards</a>

    <div class="header-search">
      <div>
        <input type="text" placeholder="search" v-model="search" />
      </div>

      <RouterLink to="/create">
        <button class="btn-circle">
          <img src="/icons/plus.svg" alt="add-module" />
        </button>
      </RouterLink>
    </div>

    <div class="header-btns">
      <button class="btn-circle">
        <img src="/icons/notification.svg" alt="notification" />
      </button>

      <button v-if="isAuth" @click="pushToProfile">
        <button class="btn-circle">
          <img src="/icons/profile.svg" alt="profile" />
        </button>
      </button>

      <RouterLink v-if="!isAuth" to="/login">
        <button class="btn-circle">
          <img src="/icons/auth.svg" alt="auth" />
        </button>
      </RouterLink>

      <button v-else @click="userStore.logout" class="btn-circle">
        <img src="/icons/logout.svg" alt="logout" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'

import { useModuleStore } from '@/stores/ModulesStore'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()
const { search } = storeToRefs(moduleStore)

const userStore = useUserStore()
const { isAuth } = storeToRefs(userStore)

async function pushToProfile() {
  const id = String(userStore.user?.id)

  const response = await userStore.getUserProfile(id)

  if (response instanceof Error) {
    console.log('Произошла ошибка при получении профиля. Пожалуйста, попробуйте снова.')
  } else {
    const profileId = response.id
    router.push(`/profile/${profileId}`)
  }
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--dark-purple);
  padding: 24px 50px;
}

a {
  font-size: 28px;
  font-weight: 200;
}

.header-search {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-search div {
  background-color: var(--background);
  padding: 14px 24px;
  border-radius: 50px;
  width: 400px;
}

.header-search input {
  border-bottom: 1px solid white;
  width: 100%;
}

.header-search input::placeholder {
  color: white;
  font-weight: 200;
}

.header-btns {
  display: flex;
  gap: 16px;
}
</style>
