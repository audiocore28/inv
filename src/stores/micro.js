import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import Micro from '../models/Micro';

export const useMicroStore = defineStore('micro', () => {
  const microRepo = useRepo(Micro);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxefHKbsrMKFlWNcJWtXWakRoXYfUbTmOIjTMCaqlWVZhbZPO4rvE2-TyK99N7JyvLQRw/exec';

  // --- State ---------------------------------------------
  const brand = ref('all');
  const sortBy = ref('Brand (A-Z)');

  // --- Getters ---------------------------------------------
  const availableMicros = computed(() => microRepo.query().where('available', true).withAll().get());

  const soldMicros = computed(() => microRepo.query().where('available', false).withAll().get());

  const filteredMicros = computed(() => {
    let filtered = [];

    filtered = availableMicros.value.filter(a => brand.value === 'all' || a.brand === brand.value);

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


  const brands = computed(() => {

    // Get all brands from micros
    const allBrands = availableMicros.value.map(micro => micro.brand);

    // Get unique brands and their counts
    const brandCounts = allBrands.reduce((acc, brand) => {
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {});

    // Convert the counts object into an array of objects with brand and count
    const uniqueBrand = Object.entries(brandCounts).map(([brand, count]) => ({
      brand,
      count
    }));

    // Sort the unique brands in descending order
    return uniqueBrand.sort((a, b) => b.brand - a.brand);

  });


  // Styles

  // --- Actions ---------------------------------------------


  onMounted(async () => {
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
    brand, sortBy,
    // getters
    availableMicros, soldMicros, filteredMicros, brands,
    // actions
  }

}, {
  persist: {
    pick: ['filteredMicros', 'brand'] // Specify only the fields you want to save to localStorage
  }
});