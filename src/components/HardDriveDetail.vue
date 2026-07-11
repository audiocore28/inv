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
      <h1 class="font-oswald font-semibold text-md capitalize pb-1">{{ `${item.brand} ${item.model} ${formatSize(item.capacity)}` }}</h1>
      <h4 v-if="!item.available" class="text-[11px] text-slate-500 font-inter">{{ formattedAmount(item.profit) }}</h4>
    </div>
  
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
  
    <div class="flex text-slate-500 pb-2">
      <span class="text-amber-600 inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 12H21.5M6 16H10M8.96656 4H15.0334C16.1103 4 16.6487 4 17.1241 4.16396C17.5445 4.30896 17.9274 4.5456 18.2451 4.85675C18.6043 5.2086 18.8451 5.6902 19.3267 6.65337L21.4932 10.9865C21.6822 11.3645 21.7767 11.5535 21.8434 11.7515C21.9026 11.9275 21.9453 12.1085 21.971 12.2923C22 12.4992 22 12.7105 22 13.1331V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.7202 20 18.8802 20 17.2 20H6.8C5.11984 20 4.27976 20 3.63803 19.673C3.07354 19.3854 2.6146 18.9265 2.32698 18.362C2 17.7202 2 16.8802 2 15.2V13.1331C2 12.7105 2 12.4992 2.02897 12.2923C2.05471 12.1085 2.09744 11.9275 2.15662 11.7515C2.22326 11.5535 2.31776 11.3645 2.50675 10.9865L4.67331 6.65337C5.1549 5.69019 5.3957 5.2086 5.75495 4.85675C6.07263 4.5456 6.45551 4.30896 6.87589 4.16396C7.35125 4 7.88969 4 8.96656 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <span class="font-inter text-xs">{{ item.form }}"</span>
      </span>
      
      <span v-if="item.rpm !== ''" class="inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14C4 12.9494 4.20693 11.9091 4.60896 10.9385C5.011 9.96793 5.60028 9.08601 6.34315 8.34314C7.08602 7.60028 7.96793 7.011 8.93853 6.60896C9.90914 6.20693 10.9494 6 12 6C13.0506 6 14.0909 6.20693 15.0615 6.60897C16.0321 7.011 16.914 7.60028 17.6569 8.34315C18.3997 9.08602 18.989 9.96793 19.391 10.9385C19.7931 11.9091 20 12.9494 20 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> <path d="M10 15C10 14.7374 10.0517 14.4773 10.1522 14.2346C10.2528 13.992 10.4001 13.7715 10.5858 13.5858C10.7715 13.4001 10.992 13.2528 11.2346 13.1522C11.4773 13.0517 11.7374 13 12 13C12.2626 13 12.5227 13.0517 12.7654 13.1522C13.008 13.2528 13.2285 13.4001 13.4142 13.5858C13.5999 13.7715 13.7473 13.992 13.8478 14.2346C13.9483 14.4773 14 14.7374 14 15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> <path d="M13 13L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20 14V15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <span class="font-inter text-xs">{{ item.rpm }}</span>
      </span>
      
      <span class="inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Health</title> <rect width="24" height="24" fill="none" stroke="currentColor" stroke-width="0" opacity="0.01"></rect> <path d="M17.5,13.5h-4v4h-3v-4h-4v-3h4v-4h3v4h4ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z" transform="translate(0 0)"></path> </g></svg>
        <span class="font-inter text-xs">{{ item.health }}%</span>
      </span>
      
      <span class="inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <span class="font-inter text-xs">{{ item.year }}</span>
      </span>
    </div>
  </div>
</template>