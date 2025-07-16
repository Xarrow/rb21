<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">热门标签</h2>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        共 {{ tags.length }} 个标签
      </div>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        v-for="tag in tags"
        :key="tag.name"
        @click="$emit('tag-select', tag.name)"
        class="group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
        :class="selectedTag === tag.name
          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'"
      >
        <span class="relative z-10">{{ tag.name }}</span>
        <span class="ml-2 text-xs opacity-75">({{ tag.count }})</span>
        
        <!-- Animated background -->
        <div v-if="selectedTag !== tag.name" 
             class="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        <!-- Ripple effect -->
        <div class="absolute inset-0 rounded-full overflow-hidden">
          <div class="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150 transform scale-0 group-active:scale-100"></div>
        </div>
      </button>
    </div>

    <!-- Tag statistics -->
    <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div class="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalArticles }}</div>
          <div class="text-xs text-blue-500 dark:text-blue-300">总文章数</div>
        </div>
        <div class="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ todayArticles }}</div>
          <div class="text-xs text-green-500 dark:text-green-300">今日新增</div>
        </div>
        <div class="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ activeAuthors }}</div>
          <div class="text-xs text-purple-500 dark:text-purple-300">活跃作者</div>
        </div>
        <div class="p-3 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ totalViews }}</div>
          <div class="text-xs text-orange-500 dark:text-orange-300">总阅读量</div>
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
  },
  selectedTag: {
    type: String,
    default: '全部'
  }
});

defineEmits(['tag-select']);

// Mock statistics
const totalArticles = computed(() => 
  props.tags.reduce((sum, tag) => sum + tag.count, 0)
);

const todayArticles = computed(() => Math.floor(Math.random() * 50) + 10);
const activeAuthors = computed(() => Math.floor(Math.random() * 100) + 50);
const totalViews = computed(() => {
  const views = Math.floor(Math.random() * 1000000) + 500000;
  return views > 1000000 ? `${(views / 1000000).toFixed(1)}M` : `${Math.floor(views / 1000)}K`;
});
</script>