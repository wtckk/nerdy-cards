<template>
  <div class="page">
    <Header />

    <div class="page-content">
      <slot />
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Layouts/HeaderLayout.vue'
import Footer from '@/components/Layouts/FooterLayout.vue'
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
  padding: 36px 50px;
}
</style>
