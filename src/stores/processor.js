import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import Processor from '../models/Processor';

export const useProcessorStore = defineStore('processor', () => {
  const processorRepo = useRepo(Processor);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzAPdKQgwSRNpvFmb96YtF19VipkTLJSHBfr90WQxpuMT5FQ7COBp1qqJcoxW41Attp/exec';

  // --- State ---------------------------------------------
  const gen = ref('all');
  const sortBy = ref('Gen Desc');

  // --- Getters ---------------------------------------------
  const availableProcessors = computed(() => processorRepo.query().where('available', true).withAll().get());

  const soldProcessors = computed(() => processorRepo.query().where('available', false).withAll().get());

  const filteredProcessors = computed(() => {
    let filtered = [];

    filtered = availableProcessors.value.filter(a => gen.value === 'all' || a.gen === parseInt(gen.value));

    switch (sortBy.value) {
      case 'Recently Added':
        return filtered.sort((a, b) => b.id - a.id);
      case 'Brand (A-Z)':
        return filtered.sort((a, b) => a.brand.localeCompare(b.brand));
      case 'Gen Asc':
        return filtered.sort((a, b) => a.gen - b.gen);
      case 'Gen Desc':
        return filtered.sort((a, b) => b.gen - a.gen);

      default:
        return filtered.sort((a, b) => b.id - a.id);
    }

  });


  const groups = computed(() => {

    const group = availableProcessors.value.reduce((acc, processor) => {
      const category = processor.gen;

      if (!acc[category]) {
        acc[category] = {
          count: 0,
          items: []
        }
      }

      acc[category].count += 1;
      acc[category].items.push(processor);

      return acc;
    }, {});

    const categories = Object.entries(group).map(([category, data]) => ({
      category: parseInt(category, 10),
      name: `${category}th gen`,
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
      processorRepo.save(data);
    } catch (error) {
      console.error('Error fetching processors', error);
    }
  });


  return {
    // state
    gen, sortBy,
    // getters
    availableProcessors, soldProcessors, filteredProcessors, groups,
    // actions
  }

}, {
  persist: {
    pick: ['filteredProcessors', 'gen'] // Specify only the fields you want to save to localStorage
  }
});