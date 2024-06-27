<template>
  <div class="dev-page">
    <h1>UI kit</h1>

    <div class="buttons">
      <h2>кнопки UButton</h2>

      <div class="section">
        <div class="block">
          <UButton icon="true" size="small">
            <template #icon>
              <img src="/icons/cat.svg" alt="" />
            </template>
            icon btn
          </UButton>

          <UButton icon="true">
            <template #icon>
              <img src="/icons/cat.svg" alt="" />
            </template>
            icon btn
          </UButton>

          <UButton icon="true" size="large">
            <template #icon>
              <img src="/icons/cat.svg" alt="" />
            </template>
            icon btn
          </UButton>
        </div>

        <div class="block">
          <UButton size="small"> small btn </UButton>
          <UButton> medium btn </UButton>
          <UButton size="large"> large btn </UButton>
        </div>

        <div class="block">
          <UButton color="background"> background color </UButton>
          <UButton> basic color </UButton>
          <UButton color="dark-purple"> dark-purple color </UButton>
        </div>

        <div class="block">
          <UButton :disabled="true"> disabled btn </UButton>
          <UButton> mormal btn </UButton>
        </div>
      </div>

      <h2>кнопки UIconButton</h2>

      <div class="block">
        <UIconButton iconUrl="/icons/cat.svg" size="small" />
        <UIconButton iconUrl="/icons/cat.svg" />
        <UIconButton iconUrl="/icons/cat.svg" size="large" />
      </div>

      <div class="block">
        <UIconButton :disabled="true" iconUrl="/icons/cat.svg" />
        <UIconButton iconUrl="/icons/cat.svg" />
      </div>
    </div>

    <div class="inputs">
      <h2>инпуты UInput</h2>

      <div class="section">
        <div class="block">
          <UInput placeholder="обычный инпут" />
          <UInput type="textarea" placeholder="textarea" />
          <UInput style="height: 100px" type="textarea" placeholder="height: 100px textarea" />
        </div>

        <div class="block">
          <UInput type="password" placeholder="пароль" />
          <UInput type="tel" placeholder="телефон" />
          <UInput type="email" placeholder="email" />
          <UInput type="number" placeholder="число" />
          <UInput type="search" placeholder="поиск" />
          <UInput type="url" placeholder="url" />
        </div>

        <div class="block">
          <UInput label="лэйбл инпута" name="textarea-input" placeholder="обычный инпут" />
          <UInput
            label="лэйбл textarea"
            name="textarea-input"
            type="textarea"
            placeholder="textarea"
          />
        </div>

        <div class="block">
          <UInput :disabled="true" placeholder="disabled инпут" />
          <UInput placeholder="обычный инпут" />
        </div>

        <div class="block">
          <UInput :min-max="[null, 6]" placeholder="максимум 6 символов" />
          <UInput :min-max="[6, null]" placeholder="минимум 6 символов" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.dev-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
}

.block {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.buttons,
.inputs {
  background-color: #baa8d3;
  padding: 20px;
}
</style>
