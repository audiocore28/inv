<script setup>
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';
import { useModalStore } from '../stores/modal';
import IconClose from './icons/IconClose.vue';

const soldStore = useSoldStore();
const modalStore = useModalStore();

const { orders } = storeToRefs(soldStore);

defineProps({
  item: {
    type: Object,
  },
});
</script>

<template>
  <div class="relative inline-block align-bottom bg-stone-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

    <!-- Close Button -->
    <div class="sm:block absolute top-0 right-0 pt-4 pr-4">
      <button @click="modalStore.closeAlert" type="button" data-behavior="cancel" class="cursor-pointer bg-stone-100 rounded-md text-gray-400 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span class="sr-only">Close</span>
        <IconClose class="h-6 w-6" />
      </button>
    </div>
    <!-- Close Button -->

    <h1 class="font-oswald text-md font-semibold text-slate-600 uppercase">Select Order</h1>
    <!-- Content -->
    <div class="text-slate-700 capitalize font-inter text-sm my-4">
      <div class="flex justify-center border border-slate-200 rounded-lg">
        <ul class="bg-white rounded-lg w-96">
          <li 
            v-for="(order, orderIndex) in orders" 
            :key="order.id" 
            @click="soldStore.toggleOrder(item, orderIndex)"
            class="flex justify-start items-center gap-2 px-5 py-2 border-b border-gray-200 w-full rounded-t-lg"
          >
            <span v-if="order.cart.includes(item)" class="text-green-500">
              <svg class="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#22c55e"></path> </g></svg>
            </span>
            <span v-else class="ml-4"></span>
            {{ order.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- / Content -->

  </div>
</template>