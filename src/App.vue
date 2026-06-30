<script setup> 
import MobileNav from '@/components/MobileNav.vue';
</script>

<template>
  <div class="bg-slate-900">
    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 2xl:p-28">
      <RouterView />
    </div>

    <MobileNav />
  </div>
</template>