<template>
    <div class="flex justify-center mt-32">
        <form class="bg-[#432671] shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 w-96">
            <p class="flex justify-center text-white text-2xl font-bold mb-4">
                Введите код 
            </p>
            <div class="mb-6">
                <label class="block text-white text-sm font-bold mb-2" for="password">
                    Код отправлен на ваш почтовый адрес
                </label>
                <input
                    class="bg-[#CBAAFF] shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="code" type="code" placeholder="Код">
                <p class="text-red-500 text-xs italic">Введите код</p>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-[#CBAAFF] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Отправить
                </button>
            </div>
            <p class="mb-0 mt-2 pt-3 text-sm text-gray-500">
                Не получили код?
                <a href="#!"
                    class="text-[#CBAAFF] text-danger transition duration-150 ease-in-out hover:hover:text-purple-800 focus:text-danger-600 active:text-danger-700">Отправить снова</a>
            </p>
        </form>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "form-layout",
});
</script>

<style scoped></style>