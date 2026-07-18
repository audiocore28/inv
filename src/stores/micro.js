import { ref, reactive, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useMemoryStore } from './memory';
import { useSolidStore } from './solid';
import { useDiskStore } from './disk';
import { formatSize } from '../utils/format';

export const useMicroStore = defineStore('micro', () => {
  const memoryStore = useMemoryStore();
  const solidStore = useSolidStore();
  const diskStore = useDiskStore();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxefHKbsrMKFlWNcJWtXWakRoXYfUbTmOIjTMCaqlWVZhbZPO4rvE2-TyK99N7JyvLQRw/exec';

  // --- State ---------------------------------------------
  const micros = shallowRef([]);
  const brand = ref('all');
  const sortBy = ref('Brand (A-Z)');

  // --- Getters ---------------------------------------------

  const microSpecs = computed(() => {
    const microMemoriesMap = new Map();
    const microSolidsMap = new Map();
    const microDisksMap = new Map();

    for (const memory of memoryStore.memories) {
      if (!microMemoriesMap.has(memory.microId)) {
        microMemoriesMap.set(memory.microId, []);
      }

      microMemoriesMap.get(memory.microId).push(memory);
    }

    for (const solid of solidStore.solids) {
      if (!microSolidsMap.has(solid.microId)) {
        microSolidsMap.set(solid.microId, []);
      }

      microSolidsMap.get(solid.microId).push(solid);
    }

    for (const disk of diskStore.disks) {
      if (!microDisksMap.has(disk.microId)) {
        microDisksMap.set(disk.microId, []);
      }

      microDisksMap.get(disk.microId).push(disk);
    }
  
    const enrichedMicros = micros.value.map(micro => {

      let text = `
${micro.brand} ${micro.model} ${micro.series} ${micro.formFactor}`;

      microMemoriesMap.get(micro.id)?.forEach(memory => {
        text += `
${memory.brand} ${memory.capacity}GB ${memory.gen} ${memory.speed}mhz`;
      });

      microSolidsMap.get(micro.id)?.forEach(solid => {
        text += `
${solid.brand} ${solid.series} ${formatSize(solid.capacity)} : ${solid.health}%`;
      });

      microDisksMap.get(micro.id)?.forEach(disk => {
        text += `
${disk.brand} ${disk.model} ${formatSize(disk.capacity)} : ${disk.year} - ${disk.health}%`;
      });

      return {
        ...micro,
        memories: microMemoriesMap.get(micro.id) || [],
        solids: microSolidsMap.get(micro.id) || [],
        disks: microDisksMap.get(micro.id) || [],
        text
      };
    });

    return enrichedMicros;
  });

  const availableMicros = computed(() => microSpecs.value.filter(d => d.available));

  const soldMicros = computed(() => microSpecs.value.filter(d => !d.available));

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
      micros.value = data.map(micro => ({
        ...micro,
        category: 'micro',
      }));
    } catch (error) {
      console.error('Error fetching micros', error);
    }
  });


  return {
    // state
    micros, brand, sortBy,
    // getters
    availableMicros, soldMicros, filteredMicros, brands, microSpecs,
    // actions
  }

}, {
  persist: {
    pick: ['micros', 'filteredMicros', 'brand'] // Specify only the fields you want to save to localStorage
  }
});