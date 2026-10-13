<script setup>
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';
import { formattedAmount } from '../utils/format';
import MicroDetail from './MicroDetail.vue';
import ProcessorDetail from './ProcessorDetail.vue';
import HardDriveDetail from '@/components/HardDriveDetail.vue';
import MemoryDetail from './MemoryDetail.vue';
import SolidDetail from './SolidDetail.vue';
import FloatingAddButton from './FloatingAddButton.vue';

const soldStore = useSoldStore();
const { orderList } = storeToRefs(soldStore);

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
    <div v-for="(order, index) in orderList" class="mt-5">
      <div>
        <div class="flex justify-between items-center my-3">
          <div class="flex items-center gap-2 text-xs text-slate-700 font-inter font-normal">
            <svg class="w-4 h-4" width="64px" height="64px" viewBox="-3 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pin_fill_sharp_circle [#634]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-223.000000, -5399.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M174,5248.219 C172.895,5248.219 172,5247.324 172,5246.219 C172,5245.114 172.895,5244.219 174,5244.219 C175.105,5244.219 176,5245.114 176,5246.219 C176,5247.324 175.105,5248.219 174,5248.219 M174,5239 C170.134,5239 167,5242.134 167,5246 C167,5249.866 174,5259 174,5259 C174,5259 181,5249.866 181,5246 C181,5242.134 177.866,5239 174,5239" id="pin_fill_sharp_circle-[#634]"> </path> </g> </g> </g> </g></svg>
            <span class="font-inter text-xs capitalize">{{ `${order.location} -> ${order.name}` }}</span>
          </div>

          <div class="flex items-center gap-2 text-xs text-slate-700 font-inter font-normal">
            <svg @click="soldStore.openOrderForm(order, index)" class="w-3 h-3" width="64px" height="64px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>edit [#1479]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill="currentColor"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"> </path> </g> </g> </g> </g></svg>
            <svg @click="soldStore.removeOrder(index)" class="w-3 h-3" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_LG"> <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
          </div>
        </div>
        
        <div class="flex justify-between items-center my-2">
          <div class="flex items-center gap-2 text-xs text-slate-400 font-inter font-normal">
            <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span class="font-inter text-xs">{{ `${order.date} ${order.time}` }}</span>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-slate-400 text-xs font-inter font-semibold mr-1">{{ formattedAmount(order.sellingPrice) }}</span>
          </div>
        </div>

        <div class="flex justify-end items-center mb-3">
          <div class="flex justify-between items-center">
            <span class="text-red-500/40 text-xs font-inter font-semibold mr-1">- {{ formattedAmount(order.totalExpenses) }}</span>
          </div>
        </div>


        <!-- Progress Bar -->
        <div class="relative w-full overflow-hidden flex h-5 bg-slate-400 shadow-inner mb-2 rounded-lg">
          <div 
            :style="{ width: order.percentageWidth ? order.percentageWidth : '0%' }"
            class="bg-lime-600 absolute inset-0 w-full transition-all duration-500 ease-out flex items-center justify-center text-xs font-semibold text-white truncate"
          >
              <!-- <span>label</span> -->
          </div>

          <div class="absolute w-full flex justify-center items-center text-slate-300 text-xs font-inter font-normal">
            <span class="flex justify-center items-center font-semibold min-w-8 h-5 rounded-full">{{ formattedAmount(order.totalProfit) }} ({{ order.percentageWidth }})</span>
          </div>
        </div>

      </div>

      <div v-if="orderList.length > 0" class="my-5">
        <div class="bg-slate-900 flex flex-wrap gap-4 justify-center mb-8 mt-5">
  
          <div class="relative bg-slate-800/70 rounded-lg p-1 flex-grow text-slate-300 w-full md:w-5/12 lg:w-3/12"
            v-for="item in order.cart" 
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

    <FloatingAddButton @click.prevent="soldStore.openOrderForm()" />

  </div> 
</template>