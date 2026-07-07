<script setup>
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';
import HardDriveDetail from '@/components/HardDriveDetail.vue';
import MemoryDetail from '@/components/MemoryDetail.vue';

const soldStore = useSoldStore();
const { sold } = storeToRefs(soldStore);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const componentMap = {
  hdd: HardDriveDetail,
  ram: MemoryDetail,
};
</script>

<template>
  <div class="bg-slate-900 flex flex-wrap gap-4 justify-center">
    <div class="relative bg-slate-700 flex-grow text-slate-300 w-full md:w-5/12 lg:w-3/12"
      v-for="item in items" 
      v-show="!sold.some(s => s.id === item.id)"
    >
      <component
        :is="componentMap[item.category]" 
        :item="item"
        :key="item.id"
        v-bind="item"
      />
    </div>
  </div>
</template>