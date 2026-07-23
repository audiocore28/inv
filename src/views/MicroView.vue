<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMicroStore } from '../stores/micro';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';
import MicroNav from '@/components/MicroNav.vue';

const microStore = useMicroStore();

const { filteredMicros, sortBy, brandCount, seriesBy, series } = storeToRefs(microStore);

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Brand (Z-A)']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="brandCount" :groups="series" :group="seriesBy" @changeGroup="seriesBy = $event" :groupBy="'seriesBy'" :category="'micro'"/>
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
      <div class="sticky bg-slate-900 lg:static top-29 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredMicros.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <List :items="filteredMicros" />
    </div>

    <MicroNav />

  </div>
</template>