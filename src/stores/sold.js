import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMicroStore } from '../stores/micro';
import { useProcessorStore } from '../stores/processor';
import { useMemoryStore } from '../stores/memory';
import { useSolidStore } from '../stores/solid';
import { useDiskStore } from '../stores/disk';
import { useModalStore } from '../stores/modal';
import OrderForm from '../components/OrderForm.vue';
import OrderList from '../components/OrderList.vue';

export const useSoldStore = defineStore('sold', () => {
  const microStore = useMicroStore();
  const processorStore = useProcessorStore();
  const memoryStore = useMemoryStore();
  const solidStore = useSolidStore();
  const diskStore = useDiskStore();
  const modalStore = useModalStore();

  // --- State ---------------------------------------------

  const sold = ref([]);
  const quota = ref(25000);

  const orders = ref([]);
  const isEditingOrder = ref(false);
  const currentOrder = ref({
    name: '',
    sellingPrice: 0,
    date: '',
    time: '',
    location: '',
    cart: [],
  });
  const currentOrderIndex = ref(-1);

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

  const orderList = computed(() => {
    return orders.value.map(order => {
      const totalExpenses = order.cart.reduce((sum, item) => sum + (item.totalCost || 0), 0);
      const totalProfit = order.sellingPrice - totalExpenses;
      const percentage = (order.sellingPrice > totalExpenses) ? (totalProfit / order.sellingPrice) * 100 : 0;

      return {
        ...order,
        totalExpenses,
        totalProfit,
        percentageWidth: `${percentage.toFixed(0)}%`
      };
    });

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
          revenue: 0,
          profit: 0,
          items: []
        }
      }

      // Accumulate sales and items
      acc[month].revenue += sale.salesPrice;
      acc[month].profit += sale.profit;
      acc[month].items.push(sale);

      return acc;
    }, {});

    const mapped = Object.keys(monthlySales).map(month => {
      const data = monthlySales[month];
      const percentage = (data.revenue / quota.value) * 100;
      const profitAsQuota = (data.profit / quota.value) * 100;
      const margin = (data.profit / data.revenue) * 100;

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
        revenue: data.revenue,
        profit: data.profit,
        margin,
        items: data.items,
        marginWidth: `${profitAsQuota}%`,
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

  function toggleOrder(item, orderIndex) {
    const order = orders.value[orderIndex];
    const index = order.cart.findIndex(i => i.id === item.id);

    if (index > -1) {
      order.cart.splice(index, 1);
    } else {
      if (item.available) {
        order.cart.unshift(item);
      }
    }
  }


  const handleOrder = () => {
     if (isEditingOrder.value) {        
      // Update existing item logic      
      if (currentOrderIndex.value > -1) {
        orders.value[currentOrderIndex.value] = { ...currentOrder.value };
      }

      // Reset the form fields
      resetOrder();
      isEditingOrder.value = false;

      } else {        
        // Add new item logic      

        // Validate that fields aren't empty
        if (!currentOrder.value.name) return;
    
        // Use the spread operator {...} to clone the object. 
        // This breaks the reference so future typing doesn't overwrite past entries.
        orders.value.push({ ...currentOrder.value });
    
        // Reset the form fields
        resetOrder();
      }

  }

  const resetOrder = () => {
    currentOrder.value.name = '';
    currentOrder.value.sellingPrice = 0;
    currentOrder.value.date = '';
    currentOrder.value.time = '';
    currentOrder.value.location = '';
    currentOrder.value.cart = [];
  }
  
  function removeOrder(index) {
    const isConfirmed = window.confirm("Are you sure you want to remove this order?");
    if (!isConfirmed) return;

    if (index > -1 && index < orders.value.length) {
      orders.value.splice(index, 1);
    }
  }

  function openOrderForm(order = null, index = -1) {
    if (order) {
      isEditingOrder.value = true;
      currentOrder.value = { ...order }; // Create a copy of the order to avoid mutating the original
      currentOrderIndex.value = index; // Store the index of the order being edited
      // currentOrder.value = order; // Directly assign the order to currentOrder
      modalStore.openAlert(OrderForm);
    } else {
      resetOrder();
      isEditingOrder.value = false;
      modalStore.openAlert(OrderForm);
    }
  }

  function openOrderList(item) {
    modalStore.openAlert(OrderList, { item });
  }


  return {
    // state
    sold, orders, isEditingOrder, soldItems, currentOrder,
    //getters
    orderList, monthlyPurchases, monthlyAggregates, currentMonthCount,
    // actions
    toggleSold, toggleOrder, handleOrder, resetOrder, removeOrder, openOrderForm, openOrderList
  }

}, {
  persist: {
    pick: ['sold', 'orders'] // Specify only the fields you want to save to localStorage
  }
});
