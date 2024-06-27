<template>
  <FormLayout :back-btn="true">
    <CreateModuleForm />
  </FormLayout>
</template>

<script setup lang="ts">
import FormLayout from '@/components/Layouts/FormLayout.vue'

import CreateModuleForm from '@/components/Forms/CreateModuleForm.vue'
</script>
