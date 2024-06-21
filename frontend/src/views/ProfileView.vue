<template>
  <PageLayout>
    <div class="profile">
      <div class="profile-info">
        <img src="/ava.png" alt="" />

        <strong>Данные пользователя</strong>

        <div class="info-block">
          <p>
            имя пользователя
            <span class="dots"></span>
            <span class="row">{{ profile?.username ? `${profile?.username}` : 'не указан' }}</span>
          </p>
          <p>
            группа
            <span class="dots"></span>
            <span class="row">{{ profile?.group ? `${profile?.group}` : 'не указан' }}</span>
          </p>
          <p>
            университет
            <span class="dots"></span>
            <span class="row">{{
              profile?.university ? `${profile?.university}` : 'не указан'
            }}</span>
          </p>
        </div>
      </div>

      <div class="profile-stats">stats</div>

      <ModuleList :types="types" />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import router from '@/router'

import PageLayout from '@/components/Layouts/PageLayout.vue'

import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'
import ModuleList from '@/components/Lists/ModuleList.vue'
import { ModulesType } from '@/domain/Module'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const types: ModulesType[] = ['New', 'My']

onMounted(() => {
  const id = String(router.currentRoute.value.params.id)

  userStore.getProfile(id)
})
</script>

<style scoped>
.profile {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  width: 100%;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 24px 48px;
  border-radius: 18px;
  width: 45%;

  background-color: var(--basic-purple);
}

.profile-info img {
  width: 75%;
}

.info-block {
  width: 100%;
}
.info-block p {
  display: flex;
  position: relative;
  width: 100%;
}

.info-block .dots {
  flex: 1;
  border-bottom: 1px dotted;
}

.info-block .row {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  text-align: right;
}

.profile-stats {
  width: 45%;
}
</style>
