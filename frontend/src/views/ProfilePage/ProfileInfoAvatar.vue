<template>
  <div>
    <img v-if="computedAvatarURL" :src="computedAvatarURL" alt="avatar" @click="openFileDialog" />

    <input type="file" ref="fileInput" @change="onFileSelected" style="display: none" />
    <UButton class="uploadAvatar" v-if="selectedFile" @click="uploadAvatar" color="background"
      :disabled="!selectedFile">Загрузить</UButton>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import ProfileService from '@/services/ProfileService'

const props = defineProps<{
  currentAvatarUrl: string | undefined
  profileId: string
  canBeChanged: boolean
}>()

const selectedFile = ref<File | null>(null)
const avatarUrl = ref<string | null>(null)
const errorMessage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const computedAvatarURL = computed(() => {
  return avatarUrl.value || props.currentAvatarUrl || '/ava.png'
})

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files ? target.files[0] : null
}

const uploadAvatar = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('avatar', selectedFile.value)

  try {
    await ProfileService.updateAvatar(props.profileId, formData)
    avatarUrl.value = URL.createObjectURL(selectedFile.value)
    selectedFile.value = null
  } catch (error: any) {
    console.error(error)
    errorMessage.value = 'Не вышло загрузить аватар, попробуйте другой файл'
  }
}

const openFileDialog = () => {
  if (fileInput.value && props.canBeChanged) {
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
  background-color: var(--text-purple);
}

.uploadAvatar{
  margin: 0 auto;
  margin-top: 8px;
}

</style>
