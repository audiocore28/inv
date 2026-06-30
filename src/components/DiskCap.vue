<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useDiskStore } from '../stores/disk';
import { formatSize } from '../utils/format';

const diskStore = useDiskStore();

const { capacities, capacity } = storeToRefs(diskStore);
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pt-3 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button 
      :ref="(all) => { if (capacity === 'all') all?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      @click="capacity = 'all'" 
      class="text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-500' : capacity === 'all',
      }"
    >
      all
    </button>
    <button 
      v-for="cap in capacities"
      @click.prevent="capacity = cap" 
      :ref="(el) => { if (capacity === cap) el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      class="text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-500' : capacity === cap,
      }"
    >
      {{ formatSize(cap) }}
    </button>
  </div>
</template>