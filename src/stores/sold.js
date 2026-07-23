import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMicroStore } from '../stores/micro';
import { useMemoryStore } from '../stores/memory';
import { useSolidStore } from '../stores/solid';
import { useDiskStore } from '../stores/disk';

export const useSoldStore = defineStore('sold', () => {
  const microStore = useMicroStore();
  const memoryStore = useMemoryStore();
  const solidStore = useSolidStore();
  const diskStore = useDiskStore();

  // --- State ---------------------------------------------

  const sold = ref([]);
  const quota = ref(5000);

  // --- Getters ---------------------------------------------

  const monthlyAggregates = computed(() => {

    const soldItems = [
      ...microStore.soldMicros,
      ...memoryStore.soldMemories,
      ...solidStore.soldSolids,
      ...diskStore.soldDisks
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const monthlySales = soldItems.reduce((acc, sale) => {
      const month = new Date(sale.date).toLocaleString("en-PH", { month: "long", year: "numeric" });

      if (!acc[month]) {
        acc[month] = {
          totalSales: 0,
          items: []
        }
      }

      // Accumulate sales and items
      acc[month].totalSales += sale.profit;
      acc[month].items.push(sale);

      return acc;
    }, {});

    const mapped = Object.keys(monthlySales).map(month => {
      const data = monthlySales[month];
      const percentage = (data.totalSales / quota.value) * 100;

      let percentageColor;
      if (percentage >= 75) {
        percentageColor = '#16a34a';
      } else if (percentage >= 50) {
        percentageColor = '#eab308';
      } else {
        percentageColor = '#ef4444';
      }

      return {
        month,
        totalSales: data.totalSales,
        items: data.items,
        percentageWidth: `${percentage}%`,
        percentageColor
      };
    });

    return mapped;
  });

  // --- Actions ---------------------------------------------

  function toggleSold(p) {
    const index = sold.value.findIndex(s => s.id === p.id);

    if (index > -1) {
      sold.value.splice(index, 1);

    } else {
      if (p.available) {
        sold.value.unshift(p);
      }
    }
  }

  return {
    // state
    sold,
    //getters
    monthlyAggregates,
    // actions
    toggleSold
  }

}, {
  persist: {
    pick: ['sold'] // Specify only the fields you want to save to localStorage
  }
});
