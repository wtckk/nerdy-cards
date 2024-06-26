<template>
  <img
    :src="avatarUrl ? avatarUrl : '/ava.png'"
    height="30px"
    width="30px"
    style="border-radius: 50%; background-color: var(--text-purple)"
    alt=""
  />
</template>

<script setup lang="ts">
defineProps({
  avatarUrl: {
    type: String
  }
})
</script>
