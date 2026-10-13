<script setup>
import { storeToRefs } from 'pinia';
import { useSoldStore } from '../stores/sold';
import { useModalStore } from '../stores/modal';
import IconClose from './icons/IconClose.vue';

const soldStore = useSoldStore();
const modalStore = useModalStore();

const { isEditingOrder, currentOrder } = storeToRefs(soldStore);
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

    <h1 class="font-oswald text-md font-semibold text-slate-600 uppercase">{{ isEditingOrder ? 'Edit' : 'Add' }} Order</h1>
    <!-- Content -->
    <div class="flex flex-col gap-4 items-center justify-center text-slate-600 text-xs py-5">
      <div class="flex gap-2 w-full mb-2">
        <input type="text" v-model="currentOrder.name" placeholder="Ordered by..." class="border rounded p-2 w-full" />
        <input type="number" v-model="currentOrder.sellingPrice" placeholder="0.00" class="border rounded p-2 w-full" />
      </div>
      <div class="flex gap-2 w-full mb-2">
        <input type="date" v-model="currentOrder.date" placeholder="date" class="border rounded p-2 w-full" />
        <input type="time" v-model="currentOrder.time" placeholder="time" class="border rounded p-2 w-full" />
      </div>
      <input type="text" v-model="currentOrder.location" placeholder="Location..." class="border rounded p-2 mb-2 w-full" />
      <button @click="soldStore.handleOrder" class="bg-slate-500 text-slate-200 font-semibold w-full py-2 rounded-md">{{ isEditingOrder ? 'Update' : 'Add' }}</button>
    </div>
    <!-- / Content -->

  </div>
</template>