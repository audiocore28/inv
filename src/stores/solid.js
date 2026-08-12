import { ref, computed, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { useRoute } from 'vue-router';
import { formatSize } from '../utils/format';
import Solid from '../models/Solid';

export const useSolidStore = defineStore('solid', () => {
  const solidRepo = useRepo(Solid);
  const route = useRoute();

  // --- State ---------------------------------------------
  const capacity = ref('all');
  const formInterface = ref('all');
  const sortBy = ref('Capacity Desc');

  // --- Getters ---------------------------------------------
  watch(() => route.params, (newParams) => {
    formInterface.value = newParams.category;
  });

  const availableSolids = computed(() => solidRepo.query().where('available', true).withAll().get());

  const soldSolids = computed(() => solidRepo.query().where('available', false).withAll().get());

  const filteredSolids = computed(() => {
    let filtered = [];

    filtered = availableSolids.value
      .filter(a => formInterface.value === 'all' || a.formInterface === formInterface.value)
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

  const formInterfaces = computed(() => [...new Set(availableSolids.value.map(solid => solid.formInterface))].sort((a, b) => a.localeCompare(b)) );

  const formInterfaceCount = computed(() => availableSolids.value.filter(a => formInterface.value === 'all' || a.formInterface === formInterface.value).length);

  const groups = computed(() => {
    const filtered = availableSolids.value.filter(solid => solid.formInterface === formInterface.value);

    const group = filtered.reduce((acc, solid) => {
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
    formInterface.value = route.params.category || 'all';
  });


  return {
    // state
    capacity, formInterface, sortBy,
    // getters
    availableSolids, soldSolids, filteredSolids, formInterfaces, formInterfaceCount, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredSolids', 'capacity'] // Specify only the fields you want to save to localStorage
  }
});