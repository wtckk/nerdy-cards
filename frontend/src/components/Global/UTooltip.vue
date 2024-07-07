<template>
  <div class="tooltip-container" @mouseover="showTooltip" @mouseout="hideTooltip">
    <slot></slot>
    <div v-if="isVisible" class="tooltip" :class="position">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value: string) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
})

const isVisible = ref(false)

const showTooltip = () => {
  isVisible.value = true
}

const hideTooltip = () => {
  isVisible.value = false
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  background-color: #7143bb;
  color: #fff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 12px;
  white-space: nowrap;
  z-index: 1000;
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 5px;
}

.tooltip.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 5px;
}

.tooltip.right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 5px;
}
</style>
