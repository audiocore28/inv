<script setup>
import { ref } from 'vue';
import Sold from '@/components/Sold.vue';
import Purchased from '@/components/Purchased.vue';
import Priority from '@/components/Priority.vue';

const currentTab = ref('sales');
const tabs = {
  sales: Sold,
  purchases: Purchased,
  priority: Priority
};
</script>

<template>
  <div>
    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 2xl:p-28">

      <div class="bg-slate-900 sticky top-0 w-full z-500 pb-4">
        <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pt-3 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

          <button 
            v-for="(tab, index) in tabs"
            :key="index"
            @click="currentTab = index"
            :class="{ 
              'bg-slate-500' : currentTab === index,
              'bg-slate-800/70' : currentTab !== index,
            }"
            class="text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
          >
            {{ index }}
          </button>

        </div>
      </div>


      <component :is="tabs[currentTab]"></component>
    </div>
  </div>
</template>