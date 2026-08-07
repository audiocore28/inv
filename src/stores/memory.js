import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import Memory from '../models/Memory';

export const useMemoryStore = defineStore('memory', () => {
  const memoryRepo = useRepo(Memory);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNweKRoVSB-Fy9ll1mJDDwx5oF_1oEhdCC-_JQO5bH-OE3DoB0Hq8SThYPVM0N9NkF/exec';

  // --- State ---------------------------------------------
  const capacity = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------
  const availableMemories = computed(() => memoryRepo.query().where('available', true).withAll().get());

  const soldMemories = computed(() => memoryRepo.query().where('available', false).withAll().get());

  const filteredMemories = computed(() => {
    let filtered = [];

    filtered = availableMemories.value.filter(a => capacity.value === 'all' || a.capacity === parseInt(capacity.value));

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


  const groups = computed(() => {

    const group = availableMemories.value.reduce((acc, memory) => {
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
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); 
      const data = await response.json();
      memoryRepo.save(data);
    } catch (error) {
      console.error('Error fetching memories', error);
    }
  });


  return {
    // state
    capacity, sortBy,
    // getters
    availableMemories, soldMemories, filteredMemories, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredMemories', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});