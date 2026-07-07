import { ref, reactive, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { formatSize } from '../utils/format';

export const useSolidStore = defineStore('solid', () => {

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_q2qPyO8ztLLLcsVNMLORFsAxqrRsWb9RZ5ZRJZL8e67YbDanq6unUMejAoryCvPBrw/exec';

  // --- State ---------------------------------------------
  const solids = shallowRef([]);
  const capacity = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------

  const filteredSolids = computed(() => {
    let filtered = [];

    if (capacity.value !== 'all') {
      filtered = solids.value.filter(d => d.capacity === capacity.value);
    } else {
      filtered = solids.value;
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

    // Get all capacities from solids
    const allCapacities = solids.value.map(solid => solid.capacity);

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
      solids.value = data.map(solid => ({
        ...solid,
        category: 'ssd',

        text: `
${formatSize(solid.capacity)} SSD ${solid.form} inch ${solid.brand} ${solid.series} ${solid.health}% health

${formatSize(solid.capacity)} Solid State Drive / SSD
${solid.form} inch 
${solid.brand} ${solid.series}
${solid.interface}
${solid.health}% health
        `,
      }));
    } catch (error) {
      console.error('Error fetching solids', error);
    }
  });


  return {
    // state
    solids, capacity, sortBy,
    // getters
    filteredSolids, capacities
    // actions
  }

}, {
  persist: {
    pick: ['solids', 'filteredSolids', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});