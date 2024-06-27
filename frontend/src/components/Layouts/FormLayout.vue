<template>
  <div class="form">
    <RouterLink v-if="backBtn" class="back" to="/">
      <UButton @click="router.back()" :icon="true">
        <template #icon>
          <img src="/icons/back-arrow.svg" />
        </template>
        Назад
      </UButton>
    </RouterLink>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

defineProps({
  backBtn: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.form {
  padding: 36px 50px;
  width: 1280px;
  margin: 0 auto;
}

.back {
  margin: 24px;
}

@media (max-width: 1280px) {
  .form {
    width: 768px;
    padding: 24px 36px;
  }
}
@media (max-width: 768px) {
  .form {
    width: 360px;
    padding: 12px 24px;
  }
}
</style>
