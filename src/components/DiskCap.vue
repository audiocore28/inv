<script setup>
import { formatSize } from '../utils/format';

const emit = defineEmits(['changeGroup']);

const props = defineProps({
  groups: {
    type: Array,
    default: () => [],
  },
  group: {
    type: [String, Number],
    default: 'all',
  },
});
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pt-3 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button 
      :ref="(all) => { if (group === 'all') all?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      @click.prevent="emit('changeGroup', 'all')" 
      class="text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-500' : group === 'all',
        'bg-slate-800/70' : group !== 'all',
      }"
    >
      all
    </button>
    <button 
      v-for="g in groups"
      @click.prevent="emit('changeGroup', g)" 
      :ref="(el) => { if (group === g) el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      class="text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-500' : group === g,
        'bg-slate-800/70' : group !== g,
      }"
    >
      {{ formatSize(g) }}
    </button>
  </div>
</template>