<template>
  <PageLayout>
    <h1>пользователи</h1>

    <table>
      <thead>
        <tr>
          <th>username</th>
          <th>group</th>
          <th>university</th>
          <th>createdAt</th>
          <th class="action">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profile in profiles" :key="profile.id" @click="toProfile(profile.id)">
          <td>
            <div class="user">
              <UMiniAvatar :avatarUrl="profile.avatarUrl" /> {{ profile.username }}
            </div>
          </td>
          <td>{{ profile.group || 'нет' }}</td>
          <td>{{ profile.university || 'нет' }}</td>
          <td>{{ useDateFormat(new Date(profile.createdAt), 'DD.MM.YYYY').value }}</td>
          <td class="action" @click.stop>
            <DropdownMenu :profile="profile" />
          </td>
        </tr>
      </tbody>
    </table>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDateFormat } from '@vueuse/core'

import PageLayout from '@/components/Layouts/PageLayout.vue'

import DropdownMenu from '@/views/Admin/UsersPage/DropdownMenu.vue'

import { Profile } from '@/domain/User'

import ProfileService from '@/services/ProfileService'
import UMiniAvatar from '@/components/Global/UMiniAvatar.vue'
import router from '@/router'

const profiles = ref<Profile[]>([])

onMounted(async () => {
  const response = await ProfileService.getProfiles()

  if (Array.isArray(response)) {
    profiles.value = response
  }
})

const toProfile = (id: string) => {
  router.push(`/profile/${id}`)
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid var(--basic-purple);
}

th {
  background-color: var(--dark-purple);
  font-size: 18px;
}

tr:hover {
  background-color: var(--basic-purple);
}

.action {
  text-align: center;
  width: 40px;
}

.user {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
