<script setup>
import { ref } from 'vue';

const status = ref('idle');

function copy(text) {
  // create textarea
  const el = document.createElement('textarea');

  // assign value
  el.value = text.trim();

  // style textarea
  el.style.position = 'absolute';
  el.style.left = '-9000000px';
  document.body.appendChild(el);

  // select its contents
  el.select();

  // execute copy
  document.execCommand('copy');
  
  // remove textarea
  document.body.removeChild(el);

  status.value = 'copied';

  setTimeout(() => {
    status.value = 'idle';
  }, 1000);
}

</script>

<template>
  <slot :status="status" :copy="copy"></slot>
</template>