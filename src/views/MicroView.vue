<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMicroStore } from '../stores/micro';
import Group from '@/components/Group.vue';
import List from '@/components/List.vue';
import Sort from '@/components/Sort.vue';
import MicroNav from '@/components/MicroNav.vue';
import dellIcon from '../components/icons/IconDell.vue';
import hpIcon from '../components/icons/IconHp.vue';
import intelIcon from '../components/icons/IconIntel.vue';
import lenovoIcon from '../components/icons/IconLenovo.vue';

const microStore = useMicroStore();

const { filteredMicros, sortBy, brandCount, brands, seriesBy, groups } = storeToRefs(microStore);

const iconMap = {
  dell: {
    icon: dellIcon,
    color: 'text-sky-500',
  },
  hp: {
    icon: hpIcon,
    color: 'text-gray-500',
  },
  intel: {
    icon: intelIcon,
    color: 'text-white',
  },
  lenovo: {
    icon: lenovoIcon,
    color: 'text-red-600',
  },
};

const sorts = ref(['Recently Added', 'Brand (A-Z)', 'Brand (Z-A)']);
</script>

<template>
  <div>
    <div class="bg-slate-900 sticky top-0 w-full z-[200]">
      <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
        <Group :count="brandCount" :groups="groups" :group="seriesBy" @changeGroup="seriesBy = $event" :category="'micro'"/>
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

    <MicroNav :link="'pc'" :icons="iconMap" :categories="brands" :group="seriesBy" @changeGroup="seriesBy = $event" :label="false"/>

  </div>
</template>