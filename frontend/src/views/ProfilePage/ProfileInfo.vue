<template>
  <div class="profile-info">
    <ProfileInfoAvatar
      :profile-id="profileId"
      :current-avatar-url="profile?.avatarUrl"
      :can-be-changed="userStore.user?.username === profile?.username"
    />

    <div>
      <span class="username">{{ profile?.username || 'не указан' }}</span>
      <button>
        <img src="/icons/cat.svg" alt="edit" />
      </button>
    </div>

    <div class="info-block">
      <div class="sub-block">
        <span>Учебное заведение</span>
        <span class="subtitle" v-if="!isEditing">{{ profile?.university || 'не указан' }}</span>
        <UInput
          class="info-input"
          v-else
          placeholder="Ваш университет"
          v-model="editedProfile.university"
        />
      </div>

      <div class="sub-block">
        <span>группа</span>
        <span class="subtitle" v-if="!isEditing">{{ profile?.group || 'не указан' }}</span>
        <UInput class="info-input" v-else placeholder="Ваша группа" v-model="editedProfile.group" />
      </div>
    </div>

    <UButton class="save-profile" v-if="isEditing" @click="saveProfile" color="background"
      >Сохранить</UButton
    >

    <button
      v-if="
        (!isEditing && userStore.user?.username === profile?.username) ||
        userStore.user?.role === 'ADMIN'
      "
      @click="editProfile"
    >
      <img class="pencil" src="/icons/edit.svg" alt="edit" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import ProfileInfoAvatar from '@/views/ProfilePage/ProfileInfoAvatar.vue'

import { useRoute } from 'vue-router'

import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'
import UButton from '@/components/Global/UButton.vue'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const route = useRoute()

const profileId = String(route.params.id)

const isEditing = ref(false)

const editedProfile = reactive({
  group: profile.value?.group || '',
  university: profile.value?.university || ''
})

function editProfile() {
  isEditing.value = true
}

async function saveProfile() {
  if (profile.value) {
    profile.value.group = editedProfile.group
    profile.value.university = editedProfile.university
  }

  await userStore.updatedProfile(profileId, editedProfile)

  isEditing.value = false
}
</script>

<style scoped>
.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  padding: 24px 48px;
  border-radius: 18px;
  width: 50%;

  background-color: var(--basic-purple);
}

.profile-info img {
  width: 75%;
}

.info-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.sub-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-block img {
  width: 20px;
}

.username {
  font-weight: 500;
  font-size: 24px;
}

.sub-block span:first-of-type {
  color: var(--background);
  font-weight: 500;
}

.subtitle {
  font-size: 25px;
}

.info-input {
  border: 2px solid var(--background);
  border-radius: 10px;
  margin: 10px;
}

.pencil {
  position: absolute;
  width: 25px !important;
  top: 24px;
  right: 24px;
  background-color: var(--background);
  padding: 8px;
  border-radius: 12px;
}
</style>
