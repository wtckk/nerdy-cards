<template>
  <button
    :class="[className, 'circle', size]"
    :style="`background: ${background}; border: 1px solid ${border}`"
    :disabled="disabled"
    :type="type"
  >
    <img :src="iconUrl" />
  </button>
</template>

<script setup lang="ts">
defineProps({
  className: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  iconUrl: {
    type: String
  },
  background: {
    type: String,
    default: 'var(--background);'
  },
  border: {
    type: String,
    default: 'var(--background);'
  },
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
    validator: (val: string) => ['button', 'submit', 'reset'].includes(val)
  },
  size: {
    type: String as () => 'small' | 'medium' | 'large',
    default: 'medium',
    validator: (val: string) => ['small', 'medium', 'large'].includes(val)
  }
})
</script>

<style scoped>
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;

  transition: transform 0.15s;
  transform-style: preserve-3d;
}

.circle.small {
  width: 35px;
  height: 35px;
}

.circle.small img {
  width: 20px;
  height: 20px;
}

.circle.large {
  width: 75px;
  height: 75px;
}

.circle.large img {
  width: 30px;
  height: 30px;
}

.circle:active {
  transform: translate(0em, 0.25em);
}

.circle:hover {
  scale: 1.05;
}

.circle:disabled {
  opacity: 0.5;
}
</style>
