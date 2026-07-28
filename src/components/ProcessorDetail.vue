<script setup>
import { useSoldStore } from '../stores/sold';
import { formatSize, formattedAmount } from '../utils/format';
import CopyToClipboard from '@/components/CopyToClipboard.vue';

const soldStore = useSoldStore();

const props = defineProps({
  item: {
    type: Object,
  },
});

</script>

<template>
  <div>
    <div class="flex justify-between items-center p-2">
      <h1 class="font-oswald font-semibold text-md pb-1"><span class="capitalize">{{ `${item.brand} ${item.series} ` }}</span>{{ item.model }}</h1>
      <h4 v-if="!item.available" class="text-[11px] text-slate-500 font-inter">{{ formattedAmount(item.profit) }}</h4>
    </div>
  
    <div 
      v-if="item.micro" 
      class="absolute top-2 right-2 text-xs font-inter flex justify-center items-center gap-1"
      :class="{
        'text-sky-600' : item.micro?.brand === 'dell',
        'text-rose-500' : item.micro?.brand === 'lenovo',
        'text-gray-400' : item.micro?.brand === 'hp',
      }"
    >
      <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8,2h8a2,2,0,0,1,2,2V20a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2V4A2,2,0,0,1,8,2M8,4V6h8V4H8m8,4H8v2h8V8m0,10H14v2h2Z"></path> <rect width="24" height="24" fill="none"></rect> </g>
      </svg>
      {{ `${item.micro?.series} : #${item.micro?.id}` }}
    </div>
    <div v-else>
      <div @click.prevent="soldStore.toggleSold(item)" v-if="item.available" class="absolute top-2 right-7">
        <svg class="w-4 h-4 text-slate-600" width="64px" height="64px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="currentColor" d="M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 476.16a32 32 0 1 1 45.248 45.184l-128 128a32 32 0 0 1-45.248 0l-128-128a32 32 0 1 1 45.248-45.248L704 837.504V608a32 32 0 1 1 64 0v229.504l73.408-73.408z"></path></g></svg>
      </div>
    
      <div v-if="item.available" class="absolute top-2 right-2 flex flex-col items-end text-slate-600">
        <CopyToClipboard v-slot="{ status, copy }">
          <button
            @click="copy(item.text)"
            :disabled="status === 'copied'"
            class="cursor-pointer"
            >
            <svg class="w-4 h-4" fill="currentColor" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21,8H9A1,1,0,0,0,8,9V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V9A1,1,0,0,0,21,8ZM20,20H10V10H20ZM6,15a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2H15a1,1,0,0,1,1,1V5a1,1,0,0,1-2,0V4H4V14H5A1,1,0,0,1,6,15Z"></path></g></svg>
          </button>
          <small v-if="status === 'copied'" class="mt-1 text-xs font-inter text-green-600">Copied!</small>
        </CopyToClipboard>
      </div>
    </div>
  
    <div class="flex text-slate-500 pb-2">
      <span class="text-purple-500 inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg fill="currentColor" class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.25,8H9.75A1.752,1.752,0,0,0,8,9.75v4.5A1.752,1.752,0,0,0,9.75,16h4.5A1.752,1.752,0,0,0,16,14.25V9.75A1.752,1.752,0,0,0,14.25,8ZM14,14H10V10h4Zm8-5a1,1,0,0,0,0-2H20V6.75A2.752,2.752,0,0,0,17.25,4H17V2a1,1,0,0,0-2,0V4H13V2a1,1,0,0,0-2,0V4H9V2A1,1,0,0,0,7,2V4H6.75A2.752,2.752,0,0,0,4,6.75V7H2A1,1,0,0,0,2,9H4v2H2a1,1,0,0,0,0,2H4v2H2a1,1,0,0,0,0,2H4v.25A2.752,2.752,0,0,0,6.75,20H7v2a1,1,0,0,0,2,0V20h2v2a1,1,0,0,0,2,0V20h2v2a1,1,0,0,0,2,0V20h.25A2.752,2.752,0,0,0,20,17.25V17h2a1,1,0,0,0,0-2H20V13h2a1,1,0,0,0,0-2H20V9Zm-4,8.25a.751.751,0,0,1-.75.75H6.75A.751.751,0,0,1,6,17.25V6.75A.751.751,0,0,1,6.75,6h10.5a.751.751,0,0,1,.75.75Z"></path></g></svg>
        <span class="font-inter text-xs">{{ item.gen }}th gen</span>
      </span>
      
      <span v-if="item.rpm !== ''" class="inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14C4 12.9494 4.20693 11.9091 4.60896 10.9385C5.011 9.96793 5.60028 9.08601 6.34315 8.34314C7.08602 7.60028 7.96793 7.011 8.93853 6.60896C9.90914 6.20693 10.9494 6 12 6C13.0506 6 14.0909 6.20693 15.0615 6.60897C16.0321 7.011 16.914 7.60028 17.6569 8.34315C18.3997 9.08602 18.989 9.96793 19.391 10.9385C19.7931 11.9091 20 12.9494 20 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> <path d="M10 15C10 14.7374 10.0517 14.4773 10.1522 14.2346C10.2528 13.992 10.4001 13.7715 10.5858 13.5858C10.7715 13.4001 10.992 13.2528 11.2346 13.1522C11.4773 13.0517 11.7374 13 12 13C12.2626 13 12.5227 13.0517 12.7654 13.1522C13.008 13.2528 13.2285 13.4001 13.4142 13.5858C13.5999 13.7715 13.7473 13.992 13.8478 14.2346C13.9483 14.4773 14 14.7374 14 15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> <path d="M13 13L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20 14V15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <span class="font-inter text-xs">{{ item.speed.toFixed(2) }}mhz</span>
      </span>
      
      <span class="inline-flex items-center gap-1 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" fill="currentColor" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,10h7L8,22l3-9H5L13,2Z"></path></g></svg>
        <span class="font-inter text-xs">{{ ` ${item.core}c / ${item.thread}t` }}</span>
      </span>
    </div>
  </div>
</template>