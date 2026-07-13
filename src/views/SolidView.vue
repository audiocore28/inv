<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSolidStore } from '../stores/solid';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';

const solidStore = useSolidStore();

const { availableSolids, filteredSolids, sortBy, capacity, capacities } = storeToRefs(solidStore);

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Capacity Asc', 'Capacity Desc']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="availableSolids.length" :groups="capacities" :group="capacity" @changeGroup="capacity = $event" :category="'ssd'" />
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
      <div class="sticky bg-slate-900 lg:static top-29 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredSolids.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <List :items="filteredSolids" />
    </div>

  </div>
</template>