<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSolidStore } from '../stores/solid';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';
import MicroNav from '@/components/MicroNav.vue';
import Inch25Icon from '../components/icons/IconInch25.vue';
import M2Icon from '../components/icons/IconM2.vue';

const solidStore = useSolidStore();

const { filteredSolids, filteredInstalledSolids, sortBy, formInterfaces, formInterfaceCount, capacity, groups } = storeToRefs(solidStore);

const iconMap = {
  'm.2-2280-nvme': M2Icon,
  'm.2-2280-sata': M2Icon,
  'm.2-2280-': M2Icon,
  '2.5--sata': Inch25Icon,
};

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Capacity Asc', 'Capacity Desc']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="formInterfaceCount" :groups="groups" :group="capacity" @changeGroup="capacity = $event" :category="'ssd'" />
      </div>
    </div>

    <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
      <div class="sticky bg-slate-900 lg:static top-29 z-20 flex items-center justify-between text-xs text-slate-400 font-inter">
        <div class="flex justify-center items-center gap-2">
          Count: {{ filteredSolids.length }}
        </div>
  
        <Sort :sorts="sorts" :sortBy="sortBy" @changeSort="sortBy = $event" />
      </div>
  
      <h4 v-if="filteredSolids.length > 0" class="text-slate-200 text-sm font-bold font-oswald uppercase">spare :</h4>
      <List :items="filteredSolids" class="mb-5" />

      <h4 v-if="filteredInstalledSolids.length > 0" class="text-slate-200 text-sm font-bold font-oswald uppercase">installed :</h4>
      <List :items="filteredInstalledSolids" />
    </div>

    <MicroNav :link="'ssd'" :icons="iconMap" :categories="formInterfaces" :group="capacity" @changeGroup="capacity = $event"/>

  </div>
</template>