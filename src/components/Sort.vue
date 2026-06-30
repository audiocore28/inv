<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDiskStore } from '../stores/disk';
import IconSort from './icons/IconSort.vue';

const diskStore = useDiskStore();

const { sortBy } = storeToRefs(diskStore);

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Capacity Asc', 'Capacity Desc']);
const toggleSort = ref(false);

function selectSort(sort) {
  sortBy.value = sort;
  toggleSort.value = !toggleSort;
}
</script>

<template>
  <div class="relative cursor-pointer text-slate-400 py-2">
    <div @click="toggleSort = !toggleSort" class="flex items-center justify-between space-x-2">
      <a class="menu-hover py-2 text-xs lg:mx-2">
        {{ sortBy }}
      </a>
      <span>
        <IconSort />
      </span>
    </div>

    <div v-if="toggleSort" class="absolute right-0 z-50 flex min-w-[120px] flex-col bg-slate-100 py-2 shadow-xl">
      <a 
        v-for="sort in sorts" 
        @click="selectSort(sort)" 
        class="block border-b border-slate-100 py-1 text-xs hover:bg-slate-400 hover:text-slate-200 px-3"
        :class="{
          'bg-slate-500 text-slate-200' : sort === sortBy,
          'text-slate-500' : sort !== sortBy,
        }"
      >
        {{ sort }}
      </a>
    </div>
  </div>
</template>