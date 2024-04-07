<template>
  <div
    class="flex gap-[30px] flex-col rounded-md bg-violet-400 p-3 text-white w-[320px]"
  >
    <div class="gap-[16px] flex flex-col">
      <diV class="text-base">{{ props.moduleCard.name }}</diV>
      <diV class="rounded-full px-2 w-[30%] bg-violet-500 text-sm"
        >{{ props.moduleCard.cards.length }} термина</diV
      >
    </div>

    <diV class="flex justify-between">
      <div class="text-base">{{ props.moduleCard.ownerId }}</div>
      <div>
        <div class="text-sm" v-for="tag in props.moduleCard.tags">
          {{ tag.name }}
        </div>
      </div>
    </diV>
  </div>
</template>

<script setup lang="ts">
import type { ModuleCardProps } from "./ModuleCard.types";
const props = defineProps<ModuleCardProps>();
</script>

<style scoped></style>
