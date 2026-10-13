<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
const { toggleAlert, alertComponent, alertProps } = storeToRefs(modalStore);
</script>

<template>
  <Transition name="fade">
    <div v-if="toggleAlert" class="fixed z-[1500] inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity cursor-pointer" aria-hidden="true" @click="modalStore.closeAlert">
          <div class="absolute inset-0 bg-stone-900/80"></div>
        </div>
        <!-- / Overlay -->
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
        <!-- Modal -->
          <component :is="alertComponent" v-bind="alertProps" class="inner"/>
        <!-- / Modal -->

      </div>
    </div>
  </Transition>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  /* Bounce-in Modal Animation */
  .fade-enter-active .inner {
    animation: bounce-in 0.5s;
  }

  .fade-leave-active .inner {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    
    50% {
      transform: scale(1.25);
    }

    100% {
      transform: scale(1);
    }
  }
</style>