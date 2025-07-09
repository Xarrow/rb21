<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h3>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">Live Preview</span>
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto p-6">
      <div v-if="!content" class="text-center text-gray-500 dark:text-gray-400 mt-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
        </svg>
        <p class="text-lg font-medium mb-2">Start typing to see preview</p>
        <p class="text-sm">Your markdown content will appear here</p>
      </div>
      
      <div 
        v-else 
        class="markdown-preview animate-fade-in"
        v-html="parsedContent"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { parseMarkdown } from '../utils/markdown';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

const parsedContent = computed(() => {
  return parseMarkdown(props.content);
});
</script>
