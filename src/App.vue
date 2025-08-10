<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </main>
</template>
