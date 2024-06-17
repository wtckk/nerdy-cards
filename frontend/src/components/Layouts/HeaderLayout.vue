<template>
  <header>
    <a href="/">Nerdy cards</a>

    <div class="header-search">
      <div>
        <input type="text" placeholder="search" v-model="search" />
      </div>

      <RouterLink to="create">
        <button class="btn-circle">
          <img src="/icons/plus.svg" alt="add-module" />
        </button>
      </RouterLink>
    </div>

    <div class="header-btns">
      <button class="btn-circle">
        <img src="/icons/notification.svg" alt="notification" />
      </button>

      <RouterLink to="login">
        <button class="btn-circle">
          <img src="/icons/account.svg" alt="account" />
        </button>
      </RouterLink>

      <button v-if="isAuth" @click="userStore.logout" class="btn-circle">
        <img src="/icons/logout.svg" alt="account" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useModuleStore } from '@/stores/ModulesStore'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const moduleStore = useModuleStore()
const { search } = storeToRefs(moduleStore)

const userStore = useUserStore()
const { isAuth } = storeToRefs(userStore)
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
  padding: 6px 24px;
  border-radius: 50px;
  width: 300px;
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
