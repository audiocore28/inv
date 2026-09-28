<script setup>
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';
import { formattedAmount } from '../utils/format';
import MicroDetail from './MicroDetail.vue';
import ProcessorDetail from './ProcessorDetail.vue';
import HardDriveDetail from '@/components/HardDriveDetail.vue';
import MemoryDetail from './MemoryDetail.vue';
import SolidDetail from './SolidDetail.vue';

const soldStore = useSoldStore();

const { monthlyAggregates } = storeToRefs(soldStore);

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
    <div v-for="record in monthlyAggregates" class="my-8">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-slate-400 text-xs font-inter font-normal">{{ record.month }}</h2>

        <div class="flex justify-between items-center">
          <span class="text-slate-400 text-xs font-inter font-semibold mr-1">{{ formattedAmount(record.profit) }}</span>
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="relative w-full overflow-hidden flex h-5 bg-slate-400 shadow-inner mb-2 rounded-lg">
        <div 
          :style="{ backgroundColor: record.percentageColor, width: record.percentageWidth }"
          class="absolute inset-0 w-full transition-all duration-500 ease-out flex items-center justify-center text-xs font-semibold text-white truncate"
        >
            <!-- <span>label</span> -->
        </div>

        <div class="absolute w-full flex justify-center items-center text-slate-300 text-xs font-inter font-normal">
          <span class="flex justify-center items-center font-semibold min-w-8 h-5 rounded-full">{{ record.margin.toFixed(0) }}%</span>
          <span class="ml-1 mr-2 italic">of</span>
          <span class="mr-1">{{ formattedAmount(record.revenue) }}</span>
        </div>
        <div 
          :style="{ width: record.marginWidth }"
          class="bg-purple-800 z-99 absolute inset-0 w-full transition-all duration-500 ease-out flex items-center justify-center text-xs font-semibold text-white truncate"
        >
            <!-- <span>label</span> -->
        </div>
      </div>
      
      <div class="bg-slate-900 flex flex-wrap gap-4 justify-center mt-4">
        <div v-for="item in record.items" class="relative bg-slate-800/70 rounded-lg p-1 flex-grow text-slate-300 w-full md:w-5/12 lg:w-3/12" >
          <component
            :is="componentMap[item.category]" 
            :page="'sold'"
            :item="item"
            :key="item.id"
            v-bind="item"
          />
        </div>
      </div>
    </div>
  </div> 
</template>