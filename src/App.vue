<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<style>
/* Import highlight.js theme for code syntax highlighting */
@import 'highlight.js/styles/github-dark.css';

#app {
  min-height: 100vh;
}

/* Dark mode adjustments for highlight.js */
@media (prefers-color-scheme: dark) {
  .hljs {
    background: rgb(31 41 55) !important; /* gray-800 */
    color: rgb(229 231 235) !important; /* gray-200 */
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>
