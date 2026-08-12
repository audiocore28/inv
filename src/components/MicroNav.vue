<script setup>

const emit = defineEmits(['changeGroup']);

const props = defineProps({
  link: {
    type: String,
    default: '',
  },
  icons: {
    type: Object,
    default: {},
  },
  categories: {
    type: Array,
    default: () => [],
  },
  group: {
    type: [String, Number],
    default: 'all',
  },
  label: {
    type: Boolean,
    default: true,
  }
});
</script>

<template>
  <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
    <div class="flex justify-between items-center gap-1 p-3 bg-slate-800 backdrop-blur-lg rounded-2xl shadow-lg">

      <RouterLink 
        v-for="category in categories" :key="category.id" 
        :to="{ name: link, params: { category }}" 
        @click.prevent="emit('changeGroup', 'all')"
        class="flex flex-col items-center justify-center py-2 px-3 group"
      >
        <component :is="icons[category]?.icon" :class="icons[category]?.color" />
        <span v-if="label" class="text-sm font-oswald font-bold uppercase text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ category }}</span>
      </RouterLink>

    </div>
  </div>
</template>