<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMicroStore } from '../stores/micro';
import { useMemoryStore } from '../stores/memory';
import { useSolidStore } from '../stores/solid';
import { useDiskStore } from '../stores/disk';
import Group from '@/components/Group.vue';

const microStore = useMicroStore();
const memoryStore = useMemoryStore();
const solidStore = useSolidStore();
const diskStore = useDiskStore();
</script>

<template>
  <div>
  </div>
  <div>
    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 2xl:p-28">
      <div class="my-4 text-slate-300">
        <h2 class="font-oswald text-3xl font-bold text-slate-300 mb-3 uppercase">Dashboard</h2>
      </div>
      
      <div class="mt-10 text-slate-500 text-sm uppercase font-semibold font-oswald">
        <div class="mb-5">
          <div class="text-purple-500 flex inline-flex justify-center items-center gap-2">
            <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8,2h8a2,2,0,0,1,2,2V20a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2V4A2,2,0,0,1,8,2M8,4V6h8V4H8m8,4H8v2h8V8m0,10H14v2h2Z"></path> <rect width="24" height="24" fill="none"></rect> </g></svg>
            <h3>Computers</h3>
          </div>
          <Group :count="microStore.availableMicros.length" :groups="microStore.brands" :group="microStore.brand" @changeGroup="microStore.brand = $event" :groupBy="'brand'"/>
        </div>
        <div class="mb-5">
          <div class="text-lime-500 flex inline-flex justify-center items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 299.92 299.92" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M293.4,65.2H6.52C2.914,65.2,0,68.114,0,71.72v117.36c0,3.606,2.914,6.52,6.52,6.52h6.52v32.6 c0,3.606,2.914,6.52,6.52,6.52h260.8c3.606,0,6.52-2.914,6.52-6.52v-32.6h6.52c3.606,0,6.52-2.914,6.52-6.52V71.72 C299.92,68.114,297.006,65.2,293.4,65.2z M273.84,221.68h-19.56H228.2h-26.08h-26.08h-26.08h-26.08H97.8H71.72H45.64H26.08V195.6 h19.56h26.08H97.8h26.08h26.08h26.08h26.08h26.08h26.08h19.56V221.68z M286.88,182.56h-6.52H19.56h-6.52V78.24h273.84V182.56z"></path> <path d="M32.6,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H32.6c-3.606,0-6.52,2.914-6.52,6.52 V163C26.08,166.606,28.994,169.52,32.6,169.52z M39.12,104.32H65.2v52.16H39.12V104.32z"></path> <path d="M97.8,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H97.8c-3.606,0-6.52,2.914-6.52,6.52 V163C91.28,166.606,94.194,169.52,97.8,169.52z M104.32,104.32h26.08v52.16h-26.08V104.32z"></path> <path d="M163,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H163c-3.606,0-6.52,2.914-6.52,6.52 V163C156.48,166.606,159.394,169.52,163,169.52z M169.52,104.32h26.08v52.16h-26.08V104.32z"></path> <path d="M228.2,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H228.2 c-3.606,0-6.52,2.914-6.52,6.52V163C221.68,166.606,224.594,169.52,228.2,169.52z M234.72,104.32h26.08v52.16h-26.08V104.32z"></path> <path d="M52.16,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C49.246,221.68,52.16,218.766,52.16,215.16z"></path> <path d="M78.24,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C75.326,221.68,78.24,218.766,78.24,215.16z"></path> <path d="M104.32,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C101.406,221.68,104.32,218.766,104.32,215.16z"></path> <path d="M130.4,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C127.486,221.68,130.4,218.766,130.4,215.16z"></path> <path d="M156.48,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52s-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 S156.48,218.766,156.48,215.16z"></path> <path d="M182.56,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C179.646,221.68,182.56,218.766,182.56,215.16z"></path> <path d="M208.64,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C205.726,221.68,208.64,218.766,208.64,215.16z"></path> <path d="M234.72,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C231.806,221.68,234.72,218.766,234.72,215.16z"></path> <path d="M260.8,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C257.886,221.68,260.8,218.766,260.8,215.16z"></path> </g> </g> </g> </g></svg>
            <h3>Random Access Memory</h3>
          </div>
          <Group :count="memoryStore.availableMemories.length" :groups="memoryStore.capacities" :group="memoryStore.capacity" @changeGroup="memoryStore.capacity = $event" />
        </div>
        <div class="mb-5">
          <div class="text-yellow-500 flex inline-flex justify-center items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve" width="64px" height="64px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <circle cx="5" cy="13" r="1"></circle> <rect x="4" y="28" width="2" height="2"></rect> <rect x="4" y="25" width="2" height="2"></rect> <rect x="4" y="22" width="2" height="2"></rect> <rect x="4" y="19" width="2" height="2"></rect> <rect x="4" y="16" width="2" height="2"></rect> <rect x="10" y="14" width="13" height="2"></rect> <rect x="10" y="17" width="10" height="2"></rect> <rect x="10" y="20" width="11" height="2"></rect> <rect x="10" y="23" width="4" height="2"></rect> <g> <path d="M39.841,33.938c-1.224,0-2.539,0.294-3.805,0.85c-1.65,0.726-3.012,1.802-3.836,3.03c-0.73,1.092-0.931,2.153-0.564,2.988 c0.463,1.052,1.81,1.68,3.604,1.68c1.224,0,2.539-0.293,3.804-0.85c3.201-1.406,5.216-4.162,4.4-6.018 C42.982,34.565,41.635,33.938,39.841,33.938z"></path> <path d="M54.465,44L52,40.303V18h8v-6.911C60,9.386,58.614,8,56.911,8H34H3.089C1.386,8,0,9.386,0,11.089V34v14.911 C0,50.614,1.386,52,3.089,52h53.822C58.614,52,60,50.614,60,48.911V44H54.465z M55,12c0.552,0,1,0.448,1,1s-0.448,1-1,1 s-1-0.448-1-1S54.448,12,55,12z M5,48c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S5.552,48,5,48z M9,32H2V11.089 C2,10.488,2.488,10,3.089,10h28.89C31.453,22.22,21.347,32,9,32z M39.849,43.467c-1.517,0.667-3.11,1.019-4.608,1.019 c-2.612,0-4.645-1.074-5.436-2.875c-0.651-1.483-0.391-3.226,0.734-4.905c1.032-1.542,2.699-2.873,4.692-3.749 c1.518-0.666,3.111-1.019,4.609-1.019c2.611,0,4.644,1.075,5.435,2.876C46.57,37.76,44.187,41.562,39.849,43.467z M55,48 c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S55.552,48,55,48z"></path> <polygon points="54,39.697 55.535,42 60,42 60,41 56,41 56,39 60,39 60,38 55,38 55,36 60,36 60,32 55,32 55,30 60,30 60,29 55,29 55,27 60,27 60,26 55,26 55,24 60,24 60,23 55,23 55,21 60,21 60,20 54,20 "></polygon> </g> </g> </g></svg>
            <h3>Solid State Drives</h3>
          </div>
          <Group :count="solidStore.availableSolids.length" :groups="solidStore.capacities" :group="solidStore.capacity" @changeGroup="solidStore.capacity = $event" />
        </div>
        <div class="mb-5">
          <div class="text-amber-600 flex inline-flex justify-center items-center gap-2">
            <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 12H21.5M6 16H10M8.96656 4H15.0334C16.1103 4 16.6487 4 17.1241 4.16396C17.5445 4.30896 17.9274 4.5456 18.2451 4.85675C18.6043 5.2086 18.8451 5.6902 19.3267 6.65337L21.4932 10.9865C21.6822 11.3645 21.7767 11.5535 21.8434 11.7515C21.9026 11.9275 21.9453 12.1085 21.971 12.2923C22 12.4992 22 12.7105 22 13.1331V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.7202 20 18.8802 20 17.2 20H6.8C5.11984 20 4.27976 20 3.63803 19.673C3.07354 19.3854 2.6146 18.9265 2.32698 18.362C2 17.7202 2 16.8802 2 15.2V13.1331C2 12.7105 2 12.4992 2.02897 12.2923C2.05471 12.1085 2.09744 11.9275 2.15662 11.7515C2.22326 11.5535 2.31776 11.3645 2.50675 10.9865L4.67331 6.65337C5.1549 5.69019 5.3957 5.2086 5.75495 4.85675C6.07263 4.5456 6.45551 4.30896 6.87589 4.16396C7.35125 4 7.88969 4 8.96656 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <h3>Hard Disk Drives</h3>
          </div>
          <Group :count="diskStore.availableDisks.length" :groups="diskStore.capacities" :group="diskStore.capacity" @changeGroup="diskStore.capacity = $event" />
        </div>
      </div>
    </div>

  </div>
</template>
