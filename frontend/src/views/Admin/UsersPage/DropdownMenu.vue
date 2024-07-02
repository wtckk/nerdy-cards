<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-button">...</button>
    <div v-if="isOpen" class="dropdown-menu">
      <RouterLink :to="`/profile/${profile.id}`">
        <button>Profile</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Profile } from '@/domain/User'

const props = defineProps<{
  profile: Profile
}>()

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background-color: var(--background);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid var(--basic-purple);
}

.dropdown-menu button {
  padding: 10px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
  border-radius: 6px;
}

.dropdown-menu button:hover {
  background-color: var(--basic-purple);
}
</style>
