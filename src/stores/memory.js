import { ref, computed, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { useRoute } from 'vue-router';
import Memory from '../models/Memory';

export const useMemoryStore = defineStore('memory', () => {
  const memoryRepo = useRepo(Memory);
  const route = useRoute();

  // --- State ---------------------------------------------
  const capacity = ref('all');
  const speed = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------
  watch(() => route.params, (newParams) => {
    speed.value = newParams.category;
  });

  const availableMemories = computed(() => memoryRepo.query().where('available', true).withAll().get());

  const spareMemories = computed(() => {
    const filtered = memoryRepo.query().whereDoesntHave('micro').where('available', true).get();

    const group = filtered.reduce((acc, memory) => {
      const category = memory.text;

      if (!acc[category]) {
        acc[category] = {
          count: 0,
          items: []
        }
      }

      acc[category].count += 1;
      acc[category].items.push(memory);

      return acc;
    }, {});

    const categories = Object.entries(group).map(([category, data]) => ({
      name: `${category}`,
      count: data.count,
      items: data.items,
      ...data.items[0] // Spread the first item to include its properties in the category object
    }));

    return categories.sort((a, b) => b.category - a.category);

  });

  const installedMemories = computed(() => memoryRepo.query().whereHas('micro', (query) => {
    query.where('available', true);
  }).where('available', true).with('micro').get());

  const soldMemories = computed(() => memoryRepo.query().where('available', false).withAll().get());

  const filteredMemories = computed(() => {
    let filtered = [];

    filtered = spareMemories.value
      .filter(a => speed.value === 'all' || a.speed === parseInt(speed.value))
      .filter(a => capacity.value === 'all' || a.capacity === parseInt(capacity.value));

    switch (sortBy.value) {
      case 'Recently Added':
        return filtered.sort((a, b) => b.id - a.id);
      case 'Brand (A-Z)':
        return filtered.sort((a, b) => a.brand.localeCompare(b.brand));
      case 'Capacity Asc':
        return filtered.sort((a, b) => a.capacity - b.capacity);
      case 'Capacity Desc':
        return filtered.sort((a, b) => b.capacity - a.capacity);

      default:
        return filtered.sort((a, b) => b.id - a.id);
    }

  });

  const filteredInstalledMemories = computed(() => {
    let filtered = [];

    filtered = installedMemories.value
      .filter(a => speed.value === 'all' || a.speed === parseInt(speed.value))
      .filter(a => capacity.value === 'all' || a.capacity === parseInt(capacity.value));

    switch (sortBy.value) {
      case 'Recently Added':
        return filtered.sort((a, b) => b.id - a.id);
      case 'Brand (A-Z)':
        return filtered.sort((a, b) => a.brand.localeCompare(b.brand));
      case 'Capacity Asc':
        return filtered.sort((a, b) => a.capacity - b.capacity);
      case 'Capacity Desc':
        return filtered.sort((a, b) => b.capacity - a.capacity);

      default:
        return filtered.sort((a, b) => b.id - a.id);
    }

  });

  const speeds = computed(() => [...new Set(availableMemories.value.map(memory => memory.speed))].sort((a, b) => b - a) );

  const speedCount = computed(() => availableMemories.value.filter(a => speed.value === 'all' || a.speed === parseInt(speed.value)).length);

  const groups = computed(() => {
    const filtered = availableMemories.value
      .filter(memory => memory.speed === parseInt(speed.value))
      .filter(memory => !memory.micro || memory.micro?.available === true);

    const group = filtered.reduce((acc, memory) => {
      const category = memory.capacity;

      if (!acc[category]) {
        acc[category] = {
          count: 0,
          items: []
        }
      }

      acc[category].count += 1;
      acc[category].items.push(memory);

      return acc;
    }, {});

    const categories = Object.entries(group).map(([category, data]) => ({
      category: parseInt(category, 10),
      name: `${category}GB`,
      count: data.count,
      items: data.items,
    }));

    return categories.sort((a, b) => b.category - a.category);

  });

  // Styles

  // --- Actions ---------------------------------------------


  onMounted(async () => {
    speed.value = route.params.category || 'all';
  });


  return {
    // state
    capacity, speed, sortBy,
    // getters
    availableMemories, spareMemories, installedMemories, soldMemories, speeds, speedCount, filteredMemories, filteredInstalledMemories, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredMemories', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});