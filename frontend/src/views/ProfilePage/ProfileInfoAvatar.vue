<template>
  <div>
    <img v-if="currentAvatarUrl" :src="currentAvatarUrl" alt="avatar" @click="openFileDialog" />
    <img v-else src="/ava.png" alt="avatar" @click="openFileDialog" />

    <input type="file" ref="fileInput" @change="onFileSelected" style="display: none" />
    <button v-if="selectedFile" @click="uploadAvatar" :disabled="!selectedFile">Загрузить</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ProfileService from '@/services/ProfileService'

const props = defineProps<{
  currentAvatarUrl: string | undefined
  profileId: string
}>()

const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

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
    await ProfileService.updateAvatar(props.profileId, formData)
  } catch (error: any) {
    console.error(error)
  }
}

const openFileDialog = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
