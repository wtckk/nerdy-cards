<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.form {
  padding: 36px 50px;
  width: 1280px;
  margin: 0 auto;
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
