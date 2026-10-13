import { ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const toggleAlert = ref(false);
  const alertComponent = shallowRef(null);
  const alertProps = ref({ title: '', message: '' });

  function openAlert(comp, compProps = {}) {
    alertComponent.value = comp;
    alertProps.value = compProps;
    toggleAlert.value = true;

  }

  function closeAlert() {
    alertProps.value = {};
    toggleAlert.value = false;
    // alertComponent.value = null;
  }


  return {
    toggleAlert,
    alertComponent,
    alertProps,
    openAlert,
    closeAlert,
  }
});