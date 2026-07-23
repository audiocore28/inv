<script setup>
import { storeToRefs } from 'pinia';
import { useMicroStore } from '../stores/micro';
import dellIcon from '../components/icons/IconDell.vue';
import hpIcon from '../components/icons/IconHp.vue';
import intelIcon from '../components/icons/IconIntel.vue';
import lenovoIcon from '../components/icons/IconLenovo.vue';

const microStore = useMicroStore();

const { brands, seriesBy } = storeToRefs(microStore);

const iconMap = {
  dell: dellIcon,
  hp: hpIcon,
  intel: intelIcon,
  lenovo: lenovoIcon,

};
</script>

<template>
  <div class="fixed bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-32px)] md:max-w-lg">
    <div class="flex justify-between items-center p-3 bg-slate-700 backdrop-blur-lg md:rounded-2xl shadow-lg border border-slate-600">

      <RouterLink 
        v-for="brand in brands" :key="brand.id" 
        :to="{ name: 'pc', params: { brand }}" 
        @click="seriesBy = 'all'"
        class="flex flex-col items-center justify-center p-2 group"
        :class="{
          'text-sky-500' : brand === 'dell',
          'text-red-600' : brand === 'lenovo',
          'text-gray-500' : brand === 'hp',
          'text-white' : brand === 'intel',
        }"
      >
        <component :is="iconMap[brand]" />
        <!-- <span class="text-[10px] uppercase mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ brand }}</span> -->
      </RouterLink>

      <!-- Sales -->
      <RouterLink to="/sold" class="flex flex-col items-center justify-center p-2 group">
        <svg class="w-7 h-7 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" width="64px" height="64px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="currentColor" d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 476.16a32 32 0 1 1 45.248 45.184l-128 128a32 32 0 0 1-45.248 0l-128-128a32 32 0 1 1 45.248-45.248L704 837.504V608a32 32 0 1 1 64 0v229.504l73.408-73.408z"></path></g></svg>
        <!-- <span class="text-[10px] mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SALES</span> -->
      </RouterLink>

    </div>
  </div>
</template>