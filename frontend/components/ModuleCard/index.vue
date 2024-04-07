<template>
  <div class="flex gap-[30px] flex-col rounded-md bg-violet-400 p-3 text-white">
    <div class="gap-[16px] flex flex-col">
      <diV>{{ props.moduleCard.name }}</diV>
      <diV>{{ props.moduleCard.cards.length }}</diV>
    </div>

    <diV class="flex justify-between">
      <div>{{ props.moduleCard.ownerId }}</div>
      <div>
        <div v-for="tag in props.moduleCard.tags">{{ tag.name }}</div>
      </div>
    </diV>
  </div>
</template>

<script setup lang="ts">
import type { ModuleCardProps } from "./ModuleCard.types";
const props = defineProps<ModuleCardProps>();
</script>

<style scoped></style>
