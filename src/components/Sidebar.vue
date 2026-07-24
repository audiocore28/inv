<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';

const soldStore = useSoldStore();
const { currentMonthCount } = storeToRefs(soldStore);

const open = ref(false);

</script>

<template>
  <div class="bg-slate-900">

    <!-- Sidebar & Hamburger Menu -->
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div 
        v-show="open" 
        :class="{
          'translate-x-0' : open,
          '-translate-x-full' : !open 
        }"
        class="font-inter fixed z-300 inset-y-0 left-0 w-64 transition duration-300 transform bg-slate-800 shadow-lg overflow-y-auto"
      >
        <div class="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 class="text-xl font-semibold text-white">Menu</h2>
          <button @click="open = false" class="text-gray-600 dark:text-gray-300 hover:text-red-500 focus:outline-none text-2xl">&times;</button>
        </div>
        <nav class="p-4 text-slate-400">
          <RouterLink :to="{ name: 'pc', params: { brand: 'dell' }}" class="block py-2 px-4 rounded hover:bg-slate-900">Desktop</RouterLink>
          <RouterLink to="/parts" class="block py-2 px-4 rounded hover:bg-slate-900">Parts</RouterLink>
        </nav>
      </div>

      <!-- Content Area -->
      <div class="flex-1 flex flex-col overflow-y-auto w-full">
        <!-- Header -->
        <header class="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-400 shadow-md">
          <button @click="open = true" class="focus:outline-none text-2xl">&#9776;</button>
          <span class="text-xl font-semibold ">Play</span>

          <RouterLink to="/sold" class="relative flex flex-col items-center justify-center p-2 group">
            <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" width="64px" height="64px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="currentColor" d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 476.16a32 32 0 1 1 45.248 45.184l-128 128a32 32 0 0 1-45.248 0l-128-128a32 32 0 1 1 45.248-45.248L704 837.504V608a32 32 0 1 1 64 0v229.504l73.408-73.408z"></path></g></svg>
            <span class="absolute -top-1 -right-1">
              <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-slate-800 rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                {{ currentMonthCount }}
              </div>
            </span>
          </RouterLink>
        </header>

        <!-- Main Content -->
        <main class="flex-1">

          <slot name="content"></slot>

        </main>
      </div>
    </div>

  </div>
</template>