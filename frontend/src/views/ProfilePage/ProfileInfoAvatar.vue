<template>
  <div>
    <img v-if="currentAvatarUrl" :src="currentAvatarUrl" alt="avatar" />
    <img v-else src="/ava.png" alt="avatar" />

    <input type="file" @change="onFileSelected" />
    <button @click="uploadAvatar" :disabled="!selectedFile">Загрузить</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import UserService from '@/services/UserService'

const props = defineProps<{
  currentAvatarUrl: string | undefined
  profileId: string
}>()

const selectedFile = ref<File | null>(null)

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files ? target.files[0] : null
}

const uploadAvatar = async () => {
  if (!selectedFile.value) {
    return
  }

  const formData = new FormData()
  formData.append('avatar', selectedFile.value)

  try {
    const response = await UserService.uploadAvatar(props.profileId, formData)
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
}
</style>
