<template>
  <RouterLink to="/create">
    <div class="add-card">
      <button class="add-btn">
        <img src="/icons/plus.svg" alt="add-module" />
      </button>
    </div>
  </RouterLink>
</template>

<script setup lang="ts"></script>

<style scoped>
.add-card {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 250px;
  width: 250px;
  height: 150px;
  padding: 20px;
  background-color: var(--basic-purple);
  border-radius: 16px;
  opacity: 0.5;
  cursor: pointer;
}

.add-card:hover {
  opacity: 0.9;
  scale: 1.05;
}

.add-btn {
  background-color: var(--basic-purple);
}
</style>
