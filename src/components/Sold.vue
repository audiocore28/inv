<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useMemoryStore } from '../stores/memory';
import { useSolidStore } from '../stores/solid';
import { useDiskStore } from '../stores/disk';
import { useSoldStore } from '../stores/sold';
import { formattedAmount } from '../utils/format';
import HardDriveDetail from '@/components/HardDriveDetail.vue';
import MemoryDetail from './MemoryDetail.vue';
import SolidDetail from './SolidDetail.vue';

const memoryStore = useMemoryStore();
const solidStore = useSolidStore();
const diskStore = useDiskStore();
const soldStore = useSoldStore();

const { memories } = storeToRefs(memoryStore);
const { solids } = storeToRefs(solidStore);
const { disks } = storeToRefs(diskStore);
const { sold } = storeToRefs(soldStore);

const monthlyAggregates = computed(() => {

  const soldItems = [
    ...memories.value.filter(item => !item.available),
    ...solids.value.filter(item => !item.available),
    ...disks.value.filter(item => !item.available),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return soldItems.reduce((acc, sale) => {
    const month = new Date(sale.date).toLocaleString("en-PH", { month: "long", year: "numeric" });

    if (!acc[month]) {
      acc[month] = {
        totalSales: 0,
        items: []
      }
    }

    // Accumulate sales and items
    acc[month].totalSales += sale.profit;
    acc[month].items.push(sale);

    return acc;
  }, {});
});

const componentMap = {
  hdd: HardDriveDetail,
  ram: MemoryDetail,
  ssd: SolidDetail,
};
</script>

<template>
  <div>
    <div v-if="sold.length > 0" class="my-5">
      <h2 class="text-slate-400 font-semibold font-oswald text-sm uppercase mb-2">Recent</h2>
      <div class="bg-slate-900 flex flex-wrap gap-4 justify-center mb-15 mt-5">
        <div class="relative bg-slate-800/70 rounded-lg p-1 flex-grow text-slate-300 w-full md:w-5/12 lg:w-3/12"
          v-for="item in sold" 
        >
          <component
            :is="componentMap[item.category]" 
            :item="item"
            :key="item.id"
            v-bind="item"
          />
        </div>
      </div>
    </div>

    <h2 class="text-slate-400 font-semibold font-oswald text-sm uppercase mt-4">Records</h2>

    <div v-for="(record, month) in monthlyAggregates" class="my-8">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-slate-400 text-xs font-inter font-normal">{{ month }}</h2>

        <div class="flex justify-between items-center">
          <span class="text-slate-400 text-xs font-inter font-semibold mr-1">{{ formattedAmount(record.totalSales) }}</span>
          <span class="ml-1 flex justify-center text-xs items-center bg-slate-800/70 p-2 min-w-8 h-5 rounded-full text-slate-400 text-xs font-inter font-normal">
            {{ record.items.length }}
          </span>
        </div>
      </div>

      <div class="bg-slate-900 flex flex-wrap gap-4 justify-center">
        <div v-for="item in record.items" class="relative bg-slate-800/70 rounded-lg p-1 flex-grow text-slate-300 w-full md:w-5/12 lg:w-3/12" >
          <component
            :is="componentMap[item.category]" 
            :item="item"
            :key="item.id"
            v-bind="item"
          />
        </div>
      </div>

    </div>
  </div> 
</template>