<template>
  <div class="profile-info">
    <ProfileInfoAvatar :profile-id="profileId" :current-avatar-url="profile?.avatarUrl" />

    <strong>Данные пользователя</strong>

    <div class="info-block">
      <p>
        имя пользователя
        <span class="dots"></span>
        <span class="row">{{ profile?.username ? `${profile?.username}` : 'не указан' }}</span>
        <button>
          <img src="/icons/cat.svg" alt="edit" />
        </button>
      </p>
      <p>
        группа
        <span class="dots"></span>
        <span v-if="!isEditing" class="row">{{
          profile?.group ? `${profile?.group}` : 'не указан'
        }}</span>
        <input v-else type="text" placeholder="Ваша группа" v-model="editedProfile.group" />
        <button v-if="!isEditing" @click="editProfile">
          <img src="/icons/edit.svg" alt="edit" />
        </button>
      </p>
      <p>
        университет
        <span class="dots"></span>
        <span v-if="!isEditing" class="row">{{
          profile?.university ? `${profile?.university}` : 'не указан'
        }}</span>
        <input
          v-else
          type="text"
          placeholder="Ваш университет"
          v-model="editedProfile.university"
        />
        <button v-if="!isEditing" @click="editProfile">
          <img src="/icons/edit.svg" alt="edit" />
        </button>
      </p>

      <button v-if="isEditing" @click="saveProfile" class="btn">save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import ProfileInfoAvatar from '@/views/ProfilePage/ProfileInfoAvatar.vue'

import router from '@/router'

import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const profileId = String(router.currentRoute.value.params.id)

const isEditing = ref(false)

const editedProfile = reactive({
  group: '',
  university: ''
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
  gap: 24px;

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
  right: 40px;
  top: 0;
  width: 100%;
  text-align: right;
}
</style>
