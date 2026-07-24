<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';

</script>

<template>
  <Sidebar>
    <template #content>

      <div class="mb-25">
        <RouterView />
      </div>

    </template>
  </Sidebar>
</template>