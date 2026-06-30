<script setup>
import { storeToRefs } from 'pinia';
import { useDiskStore } from '../stores/disk';
import DiskCap from '@/components/DiskCap.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';

const diskStore = useDiskStore();

const { filteredDisks } = storeToRefs(diskStore);

</script>

<template>
  <div>
    <DiskCap />
    <div class="h-4"></div>

    <div class="lg:static top-22 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
      <div class="flex justify-center items-center gap-2">
        Count: {{ filteredDisks.length }}
      </div>

      <Sort />
    </div>

    <List />

  </div>
</template>