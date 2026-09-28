<script setup>
import { computed, ref } from 'vue';
import { formattedAmount } from '../utils/format';

const props = defineProps({
  items: {
    type: Array,
  },
});

const itemCosts = computed(() => {
  return props.items.reduce((acc, item) => {
    const cat = item.category;

    if (!acc[cat]) {
      acc[cat] = {
        value: 0,
      }
    }

    acc[cat].value += item.totalExpenses;

    return acc;
  }, {});

});
</script>

<template>
  <div>

    <div class="flex w-full h-5 overflow-hidden bg-gray-200 rounded-lg">
      <div 
        v-for="(cost, category) in itemCosts"
        :key="category"
        :style="{ width: `${cost.value}%` }"
        :class="{
          'bg-amber-600': category === 'hdd',
          'bg-lime-500': category === 'ram',
          'bg-yellow-500': category === 'ssd',
          'bg-purple-500': category === 'cpu',
        }"
        class="h-full transition-all duration-500 ease-out flex items-center justify-center text-xs font-semibold text-white truncate"
        >
        <span>{{ `${formattedAmount(cost.value)}` }}</span>
      </div>
    </div>

  </div>
</template>