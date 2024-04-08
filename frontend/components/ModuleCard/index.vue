<template>
  <div
    class="flex gap-[46px] flex-col rounded-[18px] bg-violet-400 p-4 text-white w-[220px] hover:shadow-lg hover:bg-violet-300 cursor-pointer"
  >
    <div class="gap-[16px] flex flex-col">
      <div class="text-base">
        {{ props.moduleCard.name }}
      </div>
      <div class="rounded-full px-2 w-fit bg-violet-500 text-sm">
        {{ props.moduleCard.cards.length }} термина
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="text-base flex items-center gap-1">
        <div class="w-[30px] h-[30px] rounded-full bg-white"></div>
        <span>{{ props.moduleCard.ownerId }}</span>
      </div>
      <div>
        <div
          class="text-sm bg-[#6035a5] p-1 rounded-full min-w-14 text-center"
          v-for="tag in props.moduleCard.tags"
        >
          {{ tag.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModuleCardProps } from "./ModuleCard.types";
const props = defineProps<ModuleCardProps>();
</script>

<style scoped></style>
