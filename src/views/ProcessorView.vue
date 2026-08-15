<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProcessorStore } from '../stores/processor';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';
import MicroNav from '@/components/MicroNav.vue';
import intelIcon from '../components/icons/IconIntel.vue';
import amdIcon from '../components/icons/IconAmd.vue';

const processorStore = useProcessorStore();

const { filteredProcessors, filteredInstalledProcessors, sortBy, gen, brands, brandCount, groups } = storeToRefs(processorStore);

const iconMap = {
  intel: {
    icon: intelIcon,
    color: 'text-white',
  },
  amd: {
    icon: amdIcon,
    color: 'text-green-600',
  },
};

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Gen Asc', 'Gen Desc']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="brandCount" :groups="groups" :group="gen" @changeGroup="gen = $event" :category="'cpu'" />
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
      <div class="sticky bg-slate-900 lg:static top-29 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredProcessors.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <h4 v-if="filteredProcessors.length > 0" class="text-slate-200 text-sm font-bold font-oswald uppercase">spare :</h4>
      <List :items="filteredProcessors" class="mb-5" />

      <h4 v-if="filteredInstalledProcessors.length > 0" class="text-slate-200 text-sm font-bold font-oswald uppercase">installed :</h4>
      <List :items="filteredInstalledProcessors" />
    </div>

    <MicroNav :link="'cpu'" :icons="iconMap" :categories="brands" :group="gen" @changeGroup="gen = $event" :label="false"/>

  </div>
</template>