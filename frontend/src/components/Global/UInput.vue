<template>
  <div class="input-block">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      v-if="type !== 'textarea'"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :id="name"
      :name="name"
      :disabled="disabled"
      :minlength="minMax?.[0]"
      :maxlength="minMax?.[1]"
      :class="[className, 'input']"
    />

    <textarea
      v-else
      v-model="value"
      :placeholder="placeholder"
      :id="name"
      :name="name"
      :disabled="disabled"
      :minlength="minMax?.[0]"
      :maxlength="minMax?.[1]"
      :class="[className, 'input']"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  className: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  minMax: {
    type: Array as () => number[],
    required: false
  },
  type: {
    type: String as () =>
      | 'textarea'
      | 'text'
      | 'password'
      | 'tel'
      | 'email'
      | 'number'
      | 'search'
      | 'url',
    default: 'text',
    validator: (val: string) =>
      ['textarea', 'text', 'password', 'tel', 'email', 'number', 'search', 'url'].includes(val)
  }
})

const value = defineModel()
</script>

<style scoped>
.input-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input {
  background-color: #a78bfa;
  padding: 8px 16px;
  border-radius: 8px;
}

.input:disabled {
  opacity: 0.6;
}

textarea {
  height: 100%;
}
</style>
