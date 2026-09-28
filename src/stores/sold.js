import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMicroStore } from '../stores/micro';
import { useProcessorStore } from '../stores/processor';
import { useMemoryStore } from '../stores/memory';
import { useSolidStore } from '../stores/solid';
import { useDiskStore } from '../stores/disk';

export const useSoldStore = defineStore('sold', () => {
  const microStore = useMicroStore();
  const processorStore = useProcessorStore();
  const memoryStore = useMemoryStore();
  const solidStore = useSolidStore();
  const diskStore = useDiskStore();

  // --- State ---------------------------------------------

  const sold = ref([]);
  const quota = ref(5000);

  // --- Getters ---------------------------------------------
  const purchasedItems = computed(() => {
    return [
      ...processorStore.purchasedProcessors,
      ...memoryStore.purchasedMemories,
      ...solidStore.purchasedSolids,
      ...diskStore.purchasedDisks,
    ].sort((a, b) => new Date(b.dop) - new Date(a.dop));
  });

  const soldItems = computed(() => {
    return [
      ...microStore.soldMicros,
      ...processorStore.soldProcessors,
      ...memoryStore.soldMemories,
      ...solidStore.soldSolids,
      ...diskStore.soldDisks
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const currentMonthCount = computed(() => {

    const currentMonth = new Date().getMonth(); // Get current month (0-11)

    const filtered = soldItems.value.filter(item => {
      const itemDate = new Date(item.date);

      return itemDate.getMonth() === currentMonth; // Filter by current month
    });

    return filtered.length;
  });

  const monthlyPurchases = computed(() => {

    const purchases = purchasedItems.value.reduce((acc, purchase) => {
      const month = new Date(purchase.dop).toLocaleString("en-PH", { month: "long", year: "numeric" });

      if (!acc[month]) {
        acc[month] = {
          expenses: 0,
          profit: 0,
          items: []
        }
      }

      // Accumulate purchases and items
      acc[month].expenses += purchase.totalExpenses || 0;
      acc[month].profit += purchase.profit || 0;
      acc[month].items.push(purchase);

      return acc;
    }, {});

    const mapped = Object.keys(purchases).map(month => {
      const data = purchases[month];
      const roi = (data.profit / data.expenses) * 100;

      let percentageColor;
      if (roi >= 25) {
        percentageColor = '#16a34a';
      } else if (roi >= 15) {
        percentageColor = '#eab308';
      } else {
        percentageColor = '#ef4444';
      }

      return {
        month,
        expenses: data.expenses,
        profit: data.profit,
        roi,
        items: data.items,
        percentageWidth: `${roi}%`,
        percentageColor
      };
    });

    return mapped;
  });


  const monthlyAggregates = computed(() => {

    const monthlySales = soldItems.value.reduce((acc, sale) => {
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
    sold, soldItems,
    //getters
    monthlyPurchases, monthlyAggregates, currentMonthCount,
    // actions
    toggleSold
  }

}, {
  persist: {
    pick: ['sold'] // Specify only the fields you want to save to localStorage
  }
});
