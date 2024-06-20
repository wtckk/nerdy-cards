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

.page-content {
  padding: 36px 50px;
  width: 1280px;
  margin: 0 auto;
}

@media (max-width: 1280px) {
  .page-content {
    width: 768px;
    padding: 24px 36px;
  }
}
@media (max-width: 768px) {
  .page-content {
    width: 360px;
    padding: 12px 24px;
  }
}
</style>
