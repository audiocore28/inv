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

const { sold } = storeToRefs(soldStore);

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
    <div v-if="sold.length > 0" class="my-5">
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
  </div> 
</template>