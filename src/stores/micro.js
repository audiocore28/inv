import { ref, computed, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRepo } from 'pinia-orm';
import { useRoute } from 'vue-router';
import Micro from '../models/Micro';
import { formatSize, capitalize } from '../utils/format';
import { calculateTotalCost, calculateProfit } from '../utils/calculate';

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

  const microSpecs = computed(() => {
    const micros = microRepo.query().where('available', true).withAll().get();

    const enrichedMicros = micros.map(micro => {
      let cpu = micro.processors !== null ? `${capitalize(micro.processors.series)} ${micro.processors.tier} ${micro.processors.gen}th gen •` : '';
      let cpuDesc = micro.processors !== null ? `${capitalize(micro.processors.desc)} (${micro.processors.gen}th gen - ${micro.processors.core}cores / ${micro.processors.thread}threads)` : '';

      const ssd = () => {
        if (micro.solids.length > 0) {
          const capacity = micro.solids[0]?.capacity ? `${micro.solids[0]?.capacity}gb` : '';
          const form = micro.solids[0]?.form === 'm.2' ? 'm.2' : '';
          const connection = micro.solids[0]?.interface === 'nvme' ? 'NVMe •' : 'SSD •';
          
          return `${capacity} ${form} ${connection}`;
        } else {
          return '';
        } 
      }

      const ram = () => {
        if (micro.memories.length > 0) {
          const totalCap = micro.memories.reduce((acc, ram) => acc + ram.capacity, 0);
          
          return `${totalCap}GB ${micro.memories[0]?.gen.toUpperCase() || 'RAM'} •`
        } else {
          return '';
        }
      }

      let text = `${micro.isWifi ? 'WiFi Ready •' : ''} ${cpu} ${ssd()} ${ram()} ${micro.formFactor === 'micro' || micro.formFactor === 'mini' || micro.formFactor === 'tiny' ? 'Desktop Mini PC' : ''}

${capitalize(micro.brand)} ${capitalize(micro.model)} ${micro.series} ${micro.formFactor}
${micro.formFactor === 'micro' || micro.formFactor === 'mini' || micro.formFactor === 'tiny' ? 'Mini Desktop Computer' : ''}
${micro.adapter > 90 ? '' : '• Power Efficient'}
${micro.formFactor === 'micro' || micro.formFactor === 'mini' || micro.formFactor === 'tiny' ? '• Compact and Space-Saving' : ''}
  `; 

    text += `
${cpuDesc}`;

    micro.memories.forEach(memory => {
      if (micro.memories.length === 1) {
        text += `
${memory.text} (slot used 1 of 2)`;
      } else {
        text += `
${memory.text}`;
      }
    });

    micro.solids.forEach(solid => {
      if (solid.interface === 'nvme') {
        text += `
${solid.ssdDesc} (faster than 2.5" ssd)`;
      } else {
        text += `
${solid.ssdDesc}`;
      }
    });

      text += `
${micro.disks?.desc || ''}`;

    text += `
${micro.isWifi ? 'Built-in WiFi' : ''}
${micro.isTypeC ? 'USB Type-C' : ''}
Display port
${micro.isHdmi ? 'HDMI port' : ''}
${micro.isLocked ? 'BIOS Locked' : ''}
Windows 10 / 11 Pro (Digital License Activated)
Microsoft Office

Unit with orig ${capitalize(micro.brand)} ${micro.adapter}w power adapter`;

      return {
        ...micro,
        text,
      }

    });

    return enrichedMicros;

  });

  const availableMicros = computed(() => {

    return microSpecs.value.map(micro => {
      const bareboneCost = calculateTotalCost(micro);
      const processorCost = micro.processors ? calculateTotalCost(micro.processors) : 0;
      const memoryCost = micro.memories?.reduce((acc, memory) => acc + calculateTotalCost(memory), 0);
      const solidCost = micro.solids?.reduce((acc, solid) => acc + calculateTotalCost(solid), 0);
      const diskCost = micro.disks ? calculateTotalCost(micro.disks) : 0;

      const totalCost = bareboneCost + processorCost + memoryCost + solidCost + diskCost;
      const profit = (micro.salesPrice + micro.shippingCollected) - totalCost;

      return {
        ...micro,
        totalCost,
        profit,
      }
    });
  });

  const soldMicros = computed(() => {
    const micros = microRepo.query().where('available', false).withAll().get();

    return micros.map(micro => {
      const bareboneCost = calculateTotalCost(micro);
      const processorCost = micro.processors ? calculateTotalCost(micro.processors) : 0;
      const memoryCost = micro.memories?.reduce((acc, memory) => acc + calculateTotalCost(memory), 0);
      const solidCost = micro.solids?.reduce((acc, solid) => acc + calculateTotalCost(solid), 0);
      const diskCost = micro.disks ? calculateTotalCost(micro.disks) : 0;

      const totalCost = bareboneCost + processorCost + memoryCost + solidCost + diskCost;
      const profit = (micro.salesPrice + micro.shippingCollected) - totalCost;

      return {
        ...micro,
        totalCost,
        profit,
      }
    });
  });

  const purchasedMicros = computed(() => {
    const micros = microRepo.query().where((micro) => micro.dop !== '' && micro.dop !== null).get();

    return micros.map(micro => {
      const totalCost = calculateTotalCost(micro);
      const profit = calculateProfit(micro);

      return {
        ...micro,
        totalCost,
        profit,
      }
    });
  });

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
    availableMicros, purchasedMicros, soldMicros, filteredMicros, brands, brandCount, groups,
    // actions
  }

}, {
  persist: {
    pick: ['availableMicros', 'filteredMicros', 'brand'] // Specify only the fields you want to save to localStorage
  }
});