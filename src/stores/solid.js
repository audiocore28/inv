import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { formatSize } from '../utils/format';
import Solid from '../models/Solid';

export const useSolidStore = defineStore('solid', () => {
  const solidRepo = useRepo(Solid);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_q2qPyO8ztLLLcsVNMLORFsAxqrRsWb9RZ5ZRJZL8e67YbDanq6unUMejAoryCvPBrw/exec';

  // --- State ---------------------------------------------
  const capacity = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------
  const availableSolids = computed(() => solidRepo.query().where('available', true).withAll().get());

  const soldSolids = computed(() => solidRepo.query().where('available', false).withAll().get());

  const filteredSolids = computed(() => {
    let filtered = [];

    filtered = availableSolids.value.filter(a => capacity.value === 'all' || a.capacity === parseInt(capacity.value));

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

    const group = availableSolids.value.reduce((acc, solid) => {
      const category = solid.capacity;

      if (!acc[category]) {
        acc[category] = {
          count: 0,
          items: []
        }
      }

      acc[category].count += 1;
      acc[category].items.push(solid);

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
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); 
      const data = await response.json();
      solidRepo.save(data);
    } catch (error) {
      console.error('Error fetching solids', error);
    }
  });


  return {
    // state
    capacity, sortBy,
    // getters
    availableSolids, soldSolids, filteredSolids, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredSolids', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});