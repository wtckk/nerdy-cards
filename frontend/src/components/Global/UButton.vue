<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[className, 'btn', size, { 'has-icon': icon }]"
    :style="`background-color: var(--${color})`"
  >
    <span v-if="icon" class="icon">
      <slot name="icon"></slot>
    </span>

    <span class="button-text">
      <slot />
    </span>
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
  icon: {
    type: Boolean,
    default: false
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
  },
  color: {
    type: String as () => 'basic-purple' | 'background' | 'dark-purple',
    default: 'basic-purple',
    validator: (val: string) => ['basic-purple', 'background', 'dark-purple'].includes(val)
  }
})
</script>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  background-color: var(--basic-purple);
  border-radius: 12px;
  padding: 10px 16px;
  transition:
    background-color 0.3s,
    transform 0.15s;
}

.button-text {
  width: 100%;
}

.btn.small {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 8px;
}

.btn.large {
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 14px;
}

.btn:active {
  transform: translate(0em, 0.25em);
}

.btn:disabled {
  cursor: default;
  opacity: 0.5;
}

.btn.has-icon .icon {
  margin-right: 8px;
}
</style>
