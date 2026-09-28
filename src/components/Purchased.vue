<script setup>
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';
import { formattedAmount } from '../utils/format';
import MicroDetail from './MicroDetail.vue';
import ProcessorDetail from './ProcessorDetail.vue';
import HardDriveDetail from '@/components/HardDriveDetail.vue';
import MemoryDetail from './MemoryDetail.vue';
import SolidDetail from './SolidDetail.vue';
import BudgetBar from './BudgetBar.vue';

const soldStore = useSoldStore();

const { monthlyPurchases, monthlyAggregates } = storeToRefs(soldStore);

const componentMap = {
  cpu: ProcessorDetail,
  hdd: HardDriveDetail,
  ram: MemoryDetail,
  ssd: SolidDetail,
  micro: MicroDetail,
};
</script>

<template>
  <div>
    <div v-for="record in monthlyPurchases" class="my-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-slate-400 text-xs font-inter font-normal">{{ record.month }}</h2>

        <div class="flex justify-between items-center">
          <span class="text-slate-400 text-xs font-inter font-semibold mr-1">{{ formattedAmount(record.expenses) }}</span>
        </div>
      </div>

      <BudgetBar class="mb-2" :items="record.items" />

      <div class="relative flex h-5 bg-slate-400 shadow-inner mb-3 rounded-lg">
        <div :style="{ backgroundColor: record.percentageColor, width: record.percentageWidth, transition: `width 0.5s ease, background-color 0.5s ease` }" class="rounded-lg"></div>

        <div class="absolute w-full flex justify-center items-center text-slate-200 text-xs font-inter font-normal mb-2">
          <span class="mr-1">{{ formattedAmount(record.profit) }}</span>
          <span class="flex justify-center items-center font-semibold text-slate-200 p-1 min-w-8 h-5 rounded-full font-normal">({{ record.roi.toFixed(0) }}%)</span>
        </div>
      </div>


      <div class="bg-slate-900 flex flex-wrap gap-4 justify-center mt-4">
        <div v-for="item in record.items" class="relative bg-slate-800/70 rounded-lg flex-grow text-slate-300 w-full md:w-5/12 lg:w-3/12" >
          <component
            :is="componentMap[item.category]" 
            :item="item"
            :page="'purchased'"
            :key="item.id"
            v-bind="item"
          />
        </div>
      </div>

    </div>
  </div> 
</template>