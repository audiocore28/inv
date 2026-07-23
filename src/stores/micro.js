import { ref, computed, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { useRoute } from 'vue-router';
import Micro from '../models/Micro';

export const useMicroStore = defineStore('micro', () => {
  const microRepo = useRepo(Micro);
  const route = useRoute();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxefHKbsrMKFlWNcJWtXWakRoXYfUbTmOIjTMCaqlWVZhbZPO4rvE2-TyK99N7JyvLQRw/exec';

  // --- State ---------------------------------------------
  const brand = ref('all');
  const seriesBy = ref('all');
  const sortBy = ref('Brand (A-Z)');

  // --- Getters ---------------------------------------------
  watch(() => route.params, (newParams) => {
    brand.value = newParams.brand;
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

  const series = computed(() => {

    // Get all series from each brand
    const allSeries = availableMicros.value
      .filter(micro => micro.brand === brand.value)
      .map(micro => micro.series);

    // Get unique series and their counts
    const seriesCounts = allSeries.reduce((acc, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    // Convert the counts object into an array of objects with serie and count
    const uniqueSeries = Object.entries(seriesCounts).map(([series, count]) => ({
      series,
      count
    }));

    // Sort the unique series in descending order
    return uniqueSeries.sort((a, b) => b.series - a.series);

  });

  // Styles

  // --- Actions ---------------------------------------------


  onMounted(async () => {
    brand.value = route.params.brand || 'all';

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); 
      const data = await response.json();
      microRepo.save(data);
    } catch (error) {
      console.error('Error fetching micros', error);
    }
  });


  return {
    // state
    brand, seriesBy, sortBy,
    // getters
    availableMicros, soldMicros, filteredMicros, brands, brandCount, series,
    // actions
  }

}, {
  persist: {
    pick: ['filteredMicros', 'brand'] // Specify only the fields you want to save to localStorage
  }
});