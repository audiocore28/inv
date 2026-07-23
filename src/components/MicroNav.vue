<script setup>
import { storeToRefs } from 'pinia';
import { useMicroStore } from '../stores/micro';

const microStore = useMicroStore();

const { brands, seriesBy } = storeToRefs(microStore);
</script>

<template>
  <div class="fixed bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-32px)] md:max-w-lg">
    <div class="flex justify-between items-center p-3 bg-slate-700 backdrop-blur-lg md:rounded-2xl shadow-lg border border-slate-600">

      <RouterLink 
        v-for="brand in brands" :key="brand.id" 
        :to="{ name: 'pc', params: { brand }}" 
        @click="seriesBy = 'all'"
        class="flex flex-col items-center justify-center p-2 group"
      >
        <svg class="w-6 h-6 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z" fill="currentColor"></path> </g></svg>
        <span class="text-[10px] uppercase mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ brand }}</span>
      </RouterLink>

      <!-- Sales -->
      <RouterLink to="/sold" class="flex flex-col items-center justify-center p-2 group">
        <svg width="64px" height="64px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" transform="rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>140</title> <defs> </defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g fill="currentColor"> <path d="M5.811,11.799 L11.663,5.947 C12.825,6.548 14.207,6.436 15.095,5.549 C15.779,4.864 16.01,3.883 15.804,2.936 L14.295,4.442 L12.951,4.704 L11.325,3.095 L11.605,1.71 L13.1,0.235 C12.153,0.028 11.17,0.257 10.487,0.941 C9.598,1.829 9.488,3.211 10.089,4.374 L4.237,10.226 C3.074,9.626 1.692,9.738 0.804,10.624 C0.12,11.31 -0.111,12.29 0.096,13.237 L1.604,11.732 L2.947,11.469 L4.575,13.078 L4.294,14.463 L2.799,15.939 C3.745,16.145 4.728,15.917 5.412,15.232 C6.299,14.344 6.41,12.962 5.811,11.799 L5.811,11.799 Z" class="si-glyph-fill"> </path> <g> <path d="M14.107,12.334 L12.277,11.736 L9.941,9.4 L9.361,9.98 L11.697,12.314 L12.334,14.186 L15.401,16.019 L15.98,15.44 L14.107,12.334 Z" class="si-glyph-fill"> </path> <path d="M7.277,5.107 L2.478,0.29 C2.075,-0.114 1.367,-0.064 0.9,0.408 L0.367,0.94 C-0.1,1.412 -0.153,2.119 0.252,2.525 L5.049,7.342 L7.277,5.107 L7.277,5.107 Z" class="si-glyph-fill"> </path> </g> </g> </g> </g></svg>
        <span class="text-[10px] mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SALES</span>
      </RouterLink>

    </div>
  </div>
</template>