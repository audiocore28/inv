<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProcessorStore } from '../stores/processor';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';

const processorStore = useProcessorStore();

const { availableProcessors, filteredProcessors, sortBy, gen, generations } = storeToRefs(processorStore);

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Gen Asc', 'Gen Desc']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="availableProcessors.length" :groups="generations" :group="gen" @changeGroup="gen = $event" :groupBy="'gen'" :category="'cpu'" />
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
      <div class="sticky bg-slate-900 lg:static top-29 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredProcessors.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <List :items="filteredProcessors" />
    </div>

  </div>
</template>