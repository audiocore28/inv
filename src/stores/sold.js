import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useDiskStore } from '../stores/disk';

export const useSoldStore = defineStore('sold', () => {
  const diskStore = useDiskStore();

  // --- State ---------------------------------------------

  const sold = ref([]);

  // --- Getters ---------------------------------------------

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

    // actions
    toggleSold
  }

}, {
  persist: {
    pick: ['sold'] // Specify only the fields you want to save to localStorage
  }
});
