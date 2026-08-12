import { ref, computed, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { useRoute } from 'vue-router';
import Micro from '../models/Micro';

export const useMicroStore = defineStore('micro', () => {
  const microRepo = useRepo(Micro);
  const route = useRoute();

  // --- State ---------------------------------------------
  const brand = ref('all');
  const seriesBy = ref('all');
  const sortBy = ref('Brand (A-Z)');

  // --- Getters ---------------------------------------------
  watch(() => route.params, (newParams) => {
    brand.value = newParams.category;
  });

  const availableMicros = computed(() => microRepo.query().where('available', true).withAll().get());

  const soldMicros = computed(() => microRepo.query().where('available', false).withAll().get());

  const filteredMicros = computed(() => {
    let filtered = [];

    filtered = availableMicros.value
      .filter(a => brand.value === 'all' || a.brand === brand.value)
      .filter(a => seriesBy.value === 'all' || a.series === seriesBy.value);

    switch (sortBy.value) {
      case 'Recently Added':
        return filtered.sort((a, b) => b.id - a.id);
      case 'Brand (A-Z)':
        return filtered.sort((a, b) => a.brand.localeCompare(b.brand));
      case 'Brand (Z-A)':
        return filtered.sort((a, b) => b.brand.localeCompare(a.brand));

      default:
        return filtered.sort((a, b) => b.id - a.id);
    }

  });


  const brands = computed(() => [...new Set(availableMicros.value.map(micro => micro.brand))] );

  const brandCount = computed(() => availableMicros.value.filter(a => brand.value === 'all' || a.brand === brand.value).length);

  const groups = computed(() => {
    const filtered = availableMicros.value.filter(micro => micro.brand === brand.value);

    const group = filtered.reduce((acc, micro) => {
      const category = micro.series;

      if (!acc[category]) {
        acc[category] = {
          count: 0,
          items: []
        }
      }

      acc[category].count += 1;
      acc[category].items.push(micro);

      return acc;
    }, {});

    const categories = Object.entries(group).map(([category, data]) => ({
      category,
      name: category,
      count: data.count,
      items: data.items,
    }));

    return categories.sort((a, b) => b.category - a.category);

  });
  // Styles

  // --- Actions ---------------------------------------------


  onMounted(async () => {
    brand.value = route.params.category || 'all';
  });


  return {
    // state
    brand, seriesBy, sortBy,
    // getters
    availableMicros, soldMicros, filteredMicros, brands, brandCount, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredMicros', 'brand'] // Specify only the fields you want to save to localStorage
  }
});