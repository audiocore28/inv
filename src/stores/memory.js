import { ref, reactive, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { formatSize } from '../utils/format';

export const useMemoryStore = defineStore('memory', () => {

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNweKRoVSB-Fy9ll1mJDDwx5oF_1oEhdCC-_JQO5bH-OE3DoB0Hq8SThYPVM0N9NkF/exec';

  // --- State ---------------------------------------------
  const memories = shallowRef([]);
  const capacity = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------

  const filteredMemories = computed(() => {
    let filtered = [];

    if (capacity.value !== 'all') {
      filtered = memories.value.filter(d => d.capacity === capacity.value);
    } else {
      filtered = memories.value;
    }

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


  const capacities = computed(() => {

    // Get all capacities from memories
    const allCapacities = memories.value.map(memory => memory.capacity);

    // Get unique capacities and their counts
    const capacityCounts = allCapacities.reduce((acc, cap) => {
      acc[cap] = (acc[cap] || 0) + 1;
      return acc;
    }, {});

    // Convert the counts object into an array of objects with capacity and count
    const uniqueCapacities = Object.entries(capacityCounts).map(([cap, count]) => ({
      cap: parseInt(cap, 10),
      count
    }));

    // Sort the unique capacities in descending order
    return uniqueCapacities.sort((a, b) => b.cap - a.cap);

  });

  // Styles

  // --- Actions ---------------------------------------------


  onMounted(async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); 
      const data = await response.json();
      memories.value = data.map(memory => ({
        ...memory,
        category: 'ram',
        text: `${formatSize(memory.capacity)} ${memory.gen} ${memory.speed}mhz ${memory.brand}`,
      }));
    } catch (error) {
      console.error('Error fetching memories', error);
    }
  });


  return {
    // state
    memories, capacity, sortBy,
    // getters
    filteredMemories, capacities
    // actions
  }

}, {
  persist: {
    pick: ['memories', 'filteredMemories', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});