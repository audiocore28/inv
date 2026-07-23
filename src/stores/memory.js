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


  const capacities = computed(() => {

    // Get all capacities from memories
    const allCapacities = availableMemories.value.map(memory => memory.capacity);

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
      memoryRepo.save(data);
    } catch (error) {
      console.error('Error fetching memories', error);
    }
  });


  return {
    // state
    capacity, sortBy,
    // getters
    availableMemories, soldMemories, filteredMemories, capacities
    // actions
  }

}, {
  persist: {
    pick: ['filteredMemories', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});