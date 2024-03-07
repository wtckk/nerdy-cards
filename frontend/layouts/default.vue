<template>
  <div class="h-screen w-screen bg-slate-300">
    <div class="container mx-auto h-screen bg-slate-400 shadow-xl">
      <Header></Header>
      
      <slot></slot>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
