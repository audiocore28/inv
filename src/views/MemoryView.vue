<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMemoryStore } from '../stores/memory';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';
import MicroNav from '@/components/MicroNav.vue';

const memoryStore = useMemoryStore();

const { filteredMemories, filteredInstalledMemories, sortBy, speeds, speedCount, capacity, groups } = storeToRefs(memoryStore);

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Capacity Asc', 'Capacity Desc']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="speedCount" :groups="groups" :group="capacity" @changeGroup="capacity = $event" :category="'ram'" />
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
      <div class="sticky bg-slate-900 lg:static top-29 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredMemories.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <h4 v-if="filteredMemories.length > 0" class="text-slate-200 text-sm font-bold font-oswald uppercase">spare :</h4>
      <List :items="filteredMemories" class="mb-5" />

      <h4 v-if="filteredInstalledMemories.length > 0" class="text-slate-200 text-sm font-bold font-oswald uppercase">installed :</h4>
      <List :items="filteredInstalledMemories" />

    </div>

    <MicroNav :link="'ram'" :categories="speeds" :group="capacity" @changeGroup="capacity = $event"/>

  </div>
</template>