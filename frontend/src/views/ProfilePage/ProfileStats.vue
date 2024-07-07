<template>
  <div class="profile-stats">
    <div class="stats-top">
      <h2>Статистика</h2>

      <UButton color="background" @click="$emit('update')" icon="true">
        <template #icon>
          <img src="/icons/update.svg" alt="" />
        </template>
        обновить
      </UButton>
    </div>

    <div class="stats-grid">
      <UTooltip text="количество созданных модулей">
        <div class="stat-block">
          <div class="stat-value">{{ stats.foldersCreated }}</div>
          <div class="stat-label">Модули</div>
        </div>
      </UTooltip>

      <UTooltip text="количество лайков на модулях">
        <div class="stat-block">
          <div class="stat-value">{{ stats.likesCount }}</div>
          <div class="stat-label">Лайки</div>
        </div>
      </UTooltip>

      <UTooltip text="количество созданных карточек">
        <div class="stat-block">
          <div class="stat-value">{{ stats.cardsCreated }}</div>
          <div class="stat-label">Карточки</div>
        </div>
      </UTooltip>

      <UTooltip text="количество изученых карточек" class="full-row" position="bottom">
        <div class="stat-block full-row">
          <div class="stat-value">{{ stats.cardsLearned }}/{{ stats.cardsNotLearned }}</div>
          <div class="stat-label">
            Изучено / не изучено <br />
            карточек
          </div>
        </div>
      </UTooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProfileStats } from '@/domain/User'

defineProps<{
  stats: ProfileStats
}>()
</script>

<style scoped>
.profile-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 24px 48px;
  border-radius: 18px;
  width: 50%;

  background-color: var(--basic-purple);
}

.stats-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 16px;
  width: 100%;
  height: 100%;
}

.stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;
  padding: 18px;
  border-radius: 28px;
  background-color: var(--background);
}

.stat-label {
  font-weight: bold;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
}

.full-row {
  grid-column: 1 / span 3;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
}
</style>
