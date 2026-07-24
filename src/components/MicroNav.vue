<script setup>
import { storeToRefs } from 'pinia';
import { useMicroStore } from '../stores/micro';
import dellIcon from '../components/icons/IconDell.vue';
import hpIcon from '../components/icons/IconHp.vue';
import intelIcon from '../components/icons/IconIntel.vue';
import lenovoIcon from '../components/icons/IconLenovo.vue';

const microStore = useMicroStore();

const { brands, seriesBy } = storeToRefs(microStore);

const iconMap = {
  dell: dellIcon,
  hp: hpIcon,
  intel: intelIcon,
  lenovo: lenovoIcon,

};
</script>

<template>
  <div class="fixed bottom-0 md:bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-32px)] md:max-w-lg">
    <div class="flex justify-between items-center p-3 bg-slate-700 backdrop-blur-lg md:rounded-2xl shadow-lg border border-slate-600">

      <RouterLink 
        v-for="brand in brands" :key="brand.id" 
        :to="{ name: 'pc', params: { brand }}" 
        @click="seriesBy = 'all'"
        class="flex flex-col items-center justify-center p-2 group"
        :class="{
          'text-sky-500' : brand === 'dell',
          'text-red-600' : brand === 'lenovo',
          'text-gray-500' : brand === 'hp',
          'text-white' : brand === 'intel',
        }"
      >
        <component :is="iconMap[brand]" />
        <!-- <span class="text-[10px] uppercase mt-1 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ brand }}</span> -->
      </RouterLink>

    </div>
  </div>
</template>