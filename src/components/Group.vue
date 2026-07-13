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
  groupBy: {
    type: String,
  },
  category: {
    type: String,
  },
});
</script>

<template>
  <div class="font-semibold flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pt-3 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

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
        <p 
          class="px-4 pt-2 text-gray-500 text-xs"
          :class="{
            'text-white' : group === 'all' && category === 'micro',
            'text-green-500' : group === 'all' && category === 'ram',
            'text-yellow-500' : group === 'all' && category === 'ssd',
            'text-orange-500' : group === 'all' && category === 'hdd',
          }"
        >
          all
        </p>
        <div class="px-4 min-w-[80px] h-[80px] flex justify-center items-center">
          <h3 class="text-3xl font-bold font-oswald mt-1 text-400">{{ count }}</h3>
        </div>
      </div>
    </div>

    <div 
      v-if="groupBy === 'brand'"
      v-for="g in groups"
      @click.prevent="emit('changeGroup', g.brand)" 
      :ref="(el) => { if (group === g.brand) el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      class="text-slate-300 rounded-lg text-xs transition-all whitespace-nowrap font-inter capitalize cursor-pointer"
      :class="{
        'bg-slate-700' : group === g.brand,
        'bg-slate-800/70' : group !== g.brand,
      }"
    >
      <div>
        <p 
          class="px-4 pt-2 text-gray-500 text-xs"
          :class="{
            'text-sky-600' : group === g.brand && g.brand === 'Dell' && category === 'micro',
            'text-rose-500' : group === g.brand && g.brand === 'Lenovo' && category === 'micro',
            'text-gray-500' : group === g.brand && g.brand === 'HP' && category === 'micro',
          }"
        >
          {{ g.brand }}
        </p>
        <div class="px-4 min-w-[80px] h-[80px] flex justify-center items-center">
          <h3 class="text-3xl font-bold font-oswald mt-1 text-400">{{ g.count }}</h3>
        </div>
      </div>
    </div>

    <div 
      v-else
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
        <p 
          class="px-4 pt-2 text-gray-500 text-xs"
          :class="{
            'text-green-500' : group === g.cap && category === 'ram',
            'text-yellow-500' : group === g.cap && category === 'ssd',
            'text-orange-500' : group === g.cap && category === 'hdd',
          }"
        >
          {{ formatSize(g.cap) }}
        </p>
        <div class="px-4 min-w-[80px] h-[80px] flex justify-center items-center">
          <h3 class="text-3xl font-bold font-oswald mt-1 text-400">{{ g.count }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>