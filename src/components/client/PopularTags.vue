<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">热门标签</h3>
      <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
      </svg>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="(tag, index) in tags"
        :key="tag"
        class="group relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
        :class="getTagClass(index)"
        @click="handleTagClick(tag)"
      >
        <span class="relative z-10">{{ tag }}</span>
        
        <!-- Hover effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        <!-- Click ripple effect -->
        <div class="absolute inset-0 rounded-full overflow-hidden">
          <div class="absolute inset-0 bg-white opacity-0 group-active:opacity-30 transition-opacity duration-150 transform scale-0 group-active:scale-100"></div>
        </div>
      </button>
    </div>

    <!-- Tag Statistics -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div class="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
          <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ totalTags }}</div>
          <div class="text-xs text-blue-500 dark:text-blue-300">标签总数</div>
        </div>
        <div class="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">{{ activeTags }}</div>
          <div class="text-xs text-green-500 dark:text-green-300">活跃标签</div>
        </div>
      </div>
    </div>

    <!-- Trending Tags -->
    <div class="mt-6">
      <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
        <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
        </svg>
        趋势标签
      </h4>
      <div class="space-y-2">
        <div
          v-for="(tag, index) in trendingTags"
          :key="tag.name"
          class="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
          @click="handleTagClick(tag.name)"
        >
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full" :class="getTrendColor(index)"></div>
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ tag.name }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ tag.count }}</span>
            <svg class="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tags: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['tag-click']);

// Mock trending tags data
const trendingTags = [
  { name: 'Vue.js', count: '+23' },
  { name: 'AI', count: '+18' },
  { name: 'React', count: '+15' },
  { name: 'Python', count: '+12' },
  { name: '机器学习', count: '+9' }
];

const totalTags = computed(() => props.tags.length);
const activeTags = computed(() => Math.floor(props.tags.length * 0.7));

const getTagClass = (index) => {
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 hover:bg-pink-200 dark:hover:bg-pink-900/50',
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50',
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50',
    'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-900/50'
  ];
  return colors[index % colors.length];
};

const getTrendColor = (index) => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500'
  ];
  return colors[index % colors.length];
};

const handleTagClick = (tag) => {
  emit('tag-click', tag);
};
</script>