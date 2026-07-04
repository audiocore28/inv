<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDiskStore } from '../stores/disk';
import { formatSize } from '../utils/format';
import DiskCap from '@/components/DiskCap.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';

const diskStore = useDiskStore();

const { filteredDisks, sortBy, capacity, capacities } = storeToRefs(diskStore);

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Capacity Asc', 'Capacity Desc']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200] border-b-1 border-slate-800">
      <div class="max-w-screen-2xl mx-auto pb-3 px-5 sm:px-10 md:px-16 2xl:px-28">
        <DiskCap :groups="capacities" :group="capacity" @changeGroup="capacity = $event" />
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 2xl:p-28">
      <div class="my-4 text-slate-300">
        <h2 class="font-oswald text-2xl font-bold text-slate-300 mb-3 uppercase">{{ capacity === 'all' ? 'All Hard Drives' : `${formatSize(capacity)} Hard Drives` }}</h2>
      </div>
  
      <div class="sticky bg-slate-900 lg:static top-12 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredDisks.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <List :items="filteredDisks" />
    </div>

  </div>
</template>