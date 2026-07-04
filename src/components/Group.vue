<script setup>
import { formatSize } from '../utils/format';

const emit = defineEmits(['changeGroup']);

const props = defineProps({
  count: {
    type: Number,
    default: 0,
  },
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

    <div 
      :ref="(all) => { if (group === 'all') all?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      @click.prevent="emit('changeGroup', 'all')" 
      class="text-slate-300 rounded-lg text-xs transition-all whitespace-nowrap font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-700' : group === 'all',
        'bg-slate-800/70' : group !== 'all',
      }"
    >
      <div>
        <p class="px-4 pt-2 text-gray-500 text-xs">all</p>
        <div class="px-4 min-w-[80px] h-[80px] flex justify-center items-center">
          <h3 class="text-3xl font-bold font-oswald mt-1 text-400">{{ count }}</h3>
        </div>
      </div>
    </div>

    <div 
      v-for="g in groups"
      @click.prevent="emit('changeGroup', g.cap)" 
      :ref="(el) => { if (group === g.cap) el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      class="text-slate-300 rounded-lg text-xs transition-all whitespace-nowrap font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-700' : group === g.cap,
        'bg-slate-800/70' : group !== g.cap,
      }"
    >
      <div>
        <p class="px-4 pt-2 text-gray-500 text-xs">{{ formatSize(g.cap) }}</p>
        <div class="px-4 min-w-[80px] h-[80px] flex justify-center items-center">
          <h3 class="text-3xl font-bold font-oswald mt-1 text-400">{{ g.count }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>