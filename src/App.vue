<script setup>
import { onMounted } from 'vue';
import { useDataStore } from './stores/data.js';
import Sidebar from './components/Sidebar.vue';

const dataStore = useDataStore();

onMounted(() => {
  dataStore.fetchAndSyncData();
});

</script>

<template>
  <Sidebar>
    <template #content>

      <div class="mb-28">
        <RouterView />
      </div>

    </template>
  </Sidebar>
</template>