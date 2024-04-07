<template>
  <div class="flex flex-col h-full py-3">
    <div class="custom-scrollbar h-[35%]">
      <p class="text-[20px] text-white py-2">Новые</p>
      <div class="flex gap-[45px]">
        <div class="w-[50%] py-2" v-for="module in Modules" :key="module.id">
          <ModuleCard :module-card="module" />
        </div>
      </div>
    </div>
    <div class="h-[35%] custom-scrollbar">
      <p class="text-[20px] text-white py-2">Мои</p>
      <div class="flex gap-[45px]">
        <div class="w-[50%] py-2" v-for="module in Modules" :key="module.id">
          <ModuleCard :module-card="module" />
        </div>
      </div>
    </div>
    <div class="h-[35%] custom-scrollbar">
      <p class="text-[20px] text-white py-2">Популярные</p>
      <div class="flex gap-[45px]">
        <div class="w-[50%] py-2" v-for="module in Modules" :key="module.id">
          <ModuleCard :module-card="module" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from "~/domain/Card";

const Modules = ref<Module[]>([
  {
    id: "345435345",
    ownerId: "4343",
    name: "Модуль 1",
    likes: 3,
    createAt: "02.03.2020",
    cards: [
      {
        id: "4325456756",
        modulId: "345435345",
        term: "low",
        position: 1,
        definition: "низко",
        isLearned: false,
      },
      {
        id: "7664664",
        modulId: "345435345",
        term: "high",
        position: 2,
        definition: "высоко",
        isLearned: false,
      },
      {
        id: "98664367786",
        modulId: "345435345",
        term: "mid",
        position: 3,
        definition: "середина",
        isLearned: false,
      },
    ],
    tags: [
      {
        id: "45544534",
        creatorId: "4343",
        name: "Направления",
      },
    ],
  },
  {
    id: "455435345",
    ownerId: "4343",
    name: "Модуль 2",
    likes: 7,
    createAt: "02.04.2021",
    cards: [
      {
        id: "654863455564",
        modulId: "455435345",
        term: "index",
        position: 1,
        definition: "номер",
        isLearned: false,
      },
      {
        id: "7765674553654",
        modulId: "455435345",
        term: "PC",
        position: 2,
        definition: "персональный компьютер",
        isLearned: false,
      },
      {
        id: "89567664345",
        modulId: "455435345",
        term: "card",
        position: 3,
        definition: "карта",
        isLearned: false,
      },
      {
        id: "655464535",
        modulId: "455435345",
        term: "phone",
        position: 4,
        definition: "телефон",
        isLearned: false,
      },
    ],
    tags: [
      {
        id: "65664576",
        creatorId: "4343",
        name: "Техника",
      },
    ],
  },
  {
    id: "876756545345",
    ownerId: "4343",
    name: "Модуль 3",
    likes: 1,
    createAt: "11.04.2021",
    cards: [
      {
        id: "5434534545",
        modulId: "876756545345",
        term: "Laptop",
        position: 1,
        definition: "ноутбук",
        isLearned: false,
      },
      {
        id: "85465656",
        modulId: "876756545345",
        term: "Keyboard",
        position: 2,
        definition: "клавиатура",
        isLearned: false,
      },
      {
        id: "877675435453",
        modulId: "876756545345",
        term: "Monitor",
        position: 3,
        definition: "монитор",
        isLearned: false,
      },
      {
        id: "4357675453",
        modulId: "876756545345",
        term: "Hard drive",
        position: 4,
        definition: "жесткий диск",
        isLearned: false,
      },
    ],
    tags: [
      {
        id: "65664576",
        creatorId: "4343",
        name: "Техника",
      },
    ],
  },
  {
    id: "465546543",
    ownerId: "4343",
    name: "Модуль 4",
    likes: 1,
    createAt: "05.06.2021",
    cards: [
      {
        id: "5434534545",
        modulId: "465546543",
        term: "Junior",
        position: 1,
        definition: "новичок",
        isLearned: false,
      },
      {
        id: "85465656",
        modulId: "465546543",
        term: "Middle",
        position: 2,
        definition: "средний",
        isLearned: false,
      },
      {
        id: "877675435453",
        modulId: "465546543",
        term: "Senior",
        position: 3,
        definition: "старший",
        isLearned: false,
      },
    ],
    tags: [
      {
        id: "65544763",
        creatorId: "4343",
        name: "ИТ",
      },
    ],
  },
  {
    id: "987563453",
    ownerId: "4343",
    name: "Модуль 5",
    likes: 16,
    createAt: "05.11.2020",
    cards: [
      {
        id: "5434534545",
        modulId: "465546543",
        term: "Branch",
        position: 1,
        definition: "ветка",
        isLearned: false,
      },
      {
        id: "85465656",
        modulId: "465546543",
        term: "ID",
        position: 2,
        definition: "идентификатор",
        isLearned: false,
      },
      {
        id: "877675435453",
        modulId: "465546543",
        term: "Update",
        position: 3,
        definition: "обновление",
        isLearned: false,
      },
    ],
    tags: [
      {
        id: "65544763",
        creatorId: "4343",
        name: "ИТ",
      },
    ],
  },
  {
    id: "465546543",
    ownerId: "4343",
    name: "Модуль 5",
    likes: 1,
    createAt: "05.06.2021",
    cards: [
      {
        id: "5434534545",
        modulId: "465546543",
        term: "Junior",
        position: 1,
        definition: "новичок",
        isLearned: false,
      },
      {
        id: "85465656",
        modulId: "465546543",
        term: "Middle",
        position: 2,
        definition: "средний",
        isLearned: false,
      },
      {
        id: "877675435453",
        modulId: "465546543",
        term: "Senior",
        position: 3,
        definition: "старший",
        isLearned: false,
      },
    ],
    tags: [
      {
        id: "65544763",
        creatorId: "4343",
        name: "ИТ",
      },
    ],
  },
]);
</script>

<style scoped>
/* <template>
  <div class="flex flex-col h-full custom-scrollbar">
    <!-- Ваш текущий контент здесь -->
  </div>
</template> */

.custom-scrollbar {
  overflow-x: scroll;
  scrollbar-width: thin; /* Ширина скроллбара (Windows, MacOS) */
  scrollbar-color: rgb(167, 139, 250); /* Цвет скроллбара (для Chrome, Edge) */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px; /* Ширина скроллбара (для Webkit браузеров) */
  height: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(64, 43, 126); /* Цвет ползунка скроллбара */
  border-radius: 20px; /* Радиус закругления ползунка */
}
</style>
