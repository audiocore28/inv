import { ref, reactive, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { formatSize } from '../utils/format';

export const useDiskStore = defineStore('disk', () => {

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzks1OV1xR1zmmmSPtOOqmfadH6JpHOskbDErOpFLWM3bz-EqLIDxiypayVZPMwV5Yv/exec';

  // --- State ---------------------------------------------
  const disks = shallowRef([]);
  const capacity = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------

  const filteredDisks = computed(() => {
    let filtered = [];

    if (capacity.value !== 'all') {
      filtered = disks.value.filter(d => d.capacity === capacity.value);
    } else {
      filtered = disks.value;
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

    // Get all capacities from disks
    const allCapacities = disks.value.map(disk => disk.capacity);

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
      disks.value = data.map(disk => ({
        ...disk,
        category: 'hdd',
        text: `
${formatSize(disk.capacity)} HDD ${disk.form} inch ${disk.brand} ${disk.model} ${disk.health}% health

${formatSize(disk.capacity)} Hard Disk Drive / HDD
${disk.form} inch 
${disk.brand} ${disk.model}
${disk.rpm}rpm
${disk.health}% health
${disk.year}

For Laptop / External Storage
        `,
      }));
    } catch (error) {
      console.error('Error fetching disks', error);
    }
  });


  return {
    // state
    disks, capacity, sortBy,
    // getters
    filteredDisks, capacities
    // actions
  }

}, {
  persist: {
    pick: ['disks', 'filteredDisks', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});