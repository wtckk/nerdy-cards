<template>
  <div class="error">
    <h1>404 - Страница не найдена</h1>
    <p>Извините, но запрашиваемая вами страница не существует.</p>
    <router-link to="/">
      <UButton>Вернуться на главную</UButton>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 24px;
  height: 100vh;
}

button {
  margin-top: 24px;
}
</style>
