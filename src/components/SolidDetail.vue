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
      <h1 class="font-oswald font-semibold text-md capitalize pb-1">{{ `${item.brand} ${item.series} ${formatSize(item.capacity)}` }}</h1>
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
      <span class="text-yellow-500 inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve" width="64px" height="64px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <circle cx="5" cy="13" r="1"></circle> <rect x="4" y="28" width="2" height="2"></rect> <rect x="4" y="25" width="2" height="2"></rect> <rect x="4" y="22" width="2" height="2"></rect> <rect x="4" y="19" width="2" height="2"></rect> <rect x="4" y="16" width="2" height="2"></rect> <rect x="10" y="14" width="13" height="2"></rect> <rect x="10" y="17" width="10" height="2"></rect> <rect x="10" y="20" width="11" height="2"></rect> <rect x="10" y="23" width="4" height="2"></rect> <g> <path d="M39.841,33.938c-1.224,0-2.539,0.294-3.805,0.85c-1.65,0.726-3.012,1.802-3.836,3.03c-0.73,1.092-0.931,2.153-0.564,2.988 c0.463,1.052,1.81,1.68,3.604,1.68c1.224,0,2.539-0.293,3.804-0.85c3.201-1.406,5.216-4.162,4.4-6.018 C42.982,34.565,41.635,33.938,39.841,33.938z"></path> <path d="M54.465,44L52,40.303V18h8v-6.911C60,9.386,58.614,8,56.911,8H34H3.089C1.386,8,0,9.386,0,11.089V34v14.911 C0,50.614,1.386,52,3.089,52h53.822C58.614,52,60,50.614,60,48.911V44H54.465z M55,12c0.552,0,1,0.448,1,1s-0.448,1-1,1 s-1-0.448-1-1S54.448,12,55,12z M5,48c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S5.552,48,5,48z M9,32H2V11.089 C2,10.488,2.488,10,3.089,10h28.89C31.453,22.22,21.347,32,9,32z M39.849,43.467c-1.517,0.667-3.11,1.019-4.608,1.019 c-2.612,0-4.645-1.074-5.436-2.875c-0.651-1.483-0.391-3.226,0.734-4.905c1.032-1.542,2.699-2.873,4.692-3.749 c1.518-0.666,3.111-1.019,4.609-1.019c2.611,0,4.644,1.075,5.435,2.876C46.57,37.76,44.187,41.562,39.849,43.467z M55,48 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S55.552,48,55,48z"></path> <polygon points="54,39.697 55.535,42 60,42 60,41 56,41 56,39 60,39 60,38 55,38 55,36 60,36 60,32 55,32 55,30 60,30 60,29 55,29 55,27 60,27 60,26 55,26 55,24 60,24 60,23 55,23 55,21 60,21 60,20 54,20 "></polygon> </g> </g> </g></svg>
        <span class="font-inter text-xs">{{ item.form }}"</span>
      </span>
      
      <span v-if="item.rpm !== ''" class="inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14C4 12.9494 4.20693 11.9091 4.60896 10.9385C5.011 9.96793 5.60028 9.08601 6.34315 8.34314C7.08602 7.60028 7.96793 7.011 8.93853 6.60896C9.90914 6.20693 10.9494 6 12 6C13.0506 6 14.0909 6.20693 15.0615 6.60897C16.0321 7.011 16.914 7.60028 17.6569 8.34315C18.3997 9.08602 18.989 9.96793 19.391 10.9385C19.7931 11.9091 20 12.9494 20 14" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> <path d="M10 15C10 14.7374 10.0517 14.4773 10.1522 14.2346C10.2528 13.992 10.4001 13.7715 10.5858 13.5858C10.7715 13.4001 10.992 13.2528 11.2346 13.1522C11.4773 13.0517 11.7374 13 12 13C12.2626 13 12.5227 13.0517 12.7654 13.1522C13.008 13.2528 13.2285 13.4001 13.4142 13.5858C13.5999 13.7715 13.7473 13.992 13.8478 14.2346C13.9483 14.4773 14 14.7374 14 15" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path> <path d="M13 13L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20 14V15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <span class="font-inter text-xs uppercase">{{ item.interface }}</span>
      </span>
      
      <span class="inline-flex items-center gap-2 px-2 text-sm font-medium rounded-md transition-colors duration-200">
        <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Health</title> <rect width="24" height="24" fill="none" stroke="currentColor" stroke-width="0" opacity="0.01"></rect> <path d="M17.5,13.5h-4v4h-3v-4h-4v-3h4v-4h3v4h4ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z" transform="translate(0 0)"></path> </g></svg>
        <span class="font-inter text-xs">{{ item.health }}%</span>
      </span>
    </div>
  </div>
</template>