import { ref, computed, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { useRoute } from 'vue-router';
import { formatSize } from '../utils/format';
import Disk from '../models/Disk';

export const useDiskStore = defineStore('disk', () => {
  const diskRepo = useRepo(Disk);
  const route = useRoute();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCCPrXlpqpjYb0FrVtDYeryRv25ANu7NJ8L5v9RHqwganmjMoDlJ7aBSgCkSBVfLl_/exec';

  // --- State ---------------------------------------------
  const capacity = ref('all');
  const rpm = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------
  watch(() => route.params, (newParams) => {
    rpm.value = newParams.category;
  });

  const availableDisks = computed(() => diskRepo.query().where('available', true).withAll().get());

  const soldDisks = computed(() => diskRepo.query().where('available', false).withAll().get());

  const filteredDisks = computed(() => {
    let filtered = [];

    filtered = availableDisks.value
      .filter(a => rpm.value === 'all' || a.rpm === parseInt(rpm.value))
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


  const capacities = computed(() => {

    // Get all capacities from disks
    const allCapacities = availableDisks.value.map(disk => disk.capacity);

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

  const rpms = computed(() => [...new Set(availableDisks.value.map(disk => disk.rpm))].sort((a, b) => b - a) );

  const rpmCount = computed(() => availableDisks.value.filter(a => rpm.value === 'all' || a.rpm === parseInt(rpm.value)).length);

  const groups = computed(() => {
    const filtered = availableDisks.value.filter(disk => disk.rpm === parseInt(rpm.value));

    const group = filtered.reduce((acc, disk) => {
      const category = disk.capacity;

      if (!acc[category]) {
        acc[category] = {
          count: 0,
          items: []
        }
      }

      acc[category].count += 1;
      acc[category].items.push(disk);

      return acc;
    }, {});

    const categories = Object.entries(group).map(([category, data]) => ({
      category: parseInt(category, 10),
      name: formatSize(parseInt(category, 10)),
      count: data.count,
      items: data.items,
    }));

    return categories.sort((a, b) => b.category - a.category);

  });

  // Styles

  // --- Actions ---------------------------------------------


  onMounted(async () => {
    rpm.value = route.params.category || 'all';

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); 
      const data = await response.json();
      diskRepo.save(data);
    } catch (error) {
      console.error('Error fetching disks', error);
    }
  });


  return {
    // state
    capacity, rpm, sortBy,
    // getters
    availableDisks, soldDisks, filteredDisks, rpms, rpmCount, capacities, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredDisks', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});