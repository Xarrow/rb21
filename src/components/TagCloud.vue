<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
        标签云
      </h2>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ totalArticles }} 篇文章
      </div>
    </div>

    <!-- Current Tag Display -->
    <div v-if="currentTag" class="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-primary-900 dark:text-primary-100">当前标签</h3>
            <p class="text-sm text-primary-700 dark:text-primary-300">{{ currentTag }}</p>
          </div>
        </div>
        <button
          @click="clearTag"
          class="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors duration-200"
          title="清除标签"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Tags Grid -->
    <div class="space-y-4">
      <!-- Popular Tags -->
      <div>
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">热门标签</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in popularTags"
            :key="tag.name"
            @click="selectTag(tag.name)"
            class="tag-button tag-popular"
            :class="{ 'tag-active': currentTag === tag.name }"
          >
            <span>{{ tag.name }}</span>
            <span class="tag-count">{{ tag.count }}</span>
          </button>
        </div>
      </div>

      <!-- All Tags -->
<!--      <div>-->
<!--        <div class="flex items-center justify-between mb-3">-->
<!--          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">所有标签</h3>-->
<!--          <button-->
<!--            @click="toggleShowAll"-->
<!--            class="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"-->
<!--          >-->
<!--            {{ showAllTags ? '收起' : '展开全部' }}-->
<!--          </button>-->
<!--        </div>-->
<!--        -->
<!--        <div -->
<!--          class="flex flex-wrap gap-2 transition-all duration-300 overflow-hidden"-->
<!--          :class="showAllTags ? 'max-h-none' : 'max-h-24'"-->
<!--        >-->
<!--          <button-->
<!--            v-for="tag in (showAllTags ? allTags : allTags.slice(0, 15))"-->
<!--            :key="tag.name"-->
<!--            @click="selectTag(tag.name)"-->
<!--            class="tag-button tag-normal"-->
<!--            :class="{ 'tag-active': currentTag === tag.name }"-->
<!--            :style="{ fontSize: getTagSize(tag.count) }"-->
<!--          >-->
<!--            <span>{{ tag.name }}</span>-->
<!--            <span class="tag-count">{{ tag.count }}</span>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  currentTag: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['tag-change']);

const showAllTags = ref(false);
const searchQuery = ref('');

// Mock data - in real app, fetch from API
const allTags = ref([
  { name: '前端开发', count: 156 },
  { name: 'Vue.js', count: 89 },
  { name: 'JavaScript', count: 234 },
  { name: 'CSS', count: 67 },
  { name: 'React', count: 123 },
  { name: 'Node.js', count: 78 },
  { name: '后端开发', count: 145 },
  { name: 'Python', count: 167 },
  { name: '人工智能', count: 98 },
  { name: '机器学习', count: 76 },
  { name: '数据科学', count: 54 },
  { name: '移动开发', count: 87 },
  { name: 'Flutter', count: 43 },
  { name: 'React Native', count: 56 },
  { name: '设计', count: 89 },
  { name: 'UI/UX', count: 67 },
  { name: '摄影', count: 123 },
  { name: '旅行', count: 156 },
  { name: '美食', count: 134 },
  { name: '生活方式', count: 98 },
  { name: '健康', count: 76 },
  { name: '运动', count: 65 },
  { name: '音乐', count: 87 },
  { name: '电影', count: 109 },
  { name: '读书', count: 78 },
  { name: '写作', count: 56 },
  { name: '创业', count: 67 },
  { name: '投资', count: 45 },
  { name: '区块链', count: 34 },
  { name: '游戏', count: 89 }
]);

const popularTags = computed(() => {
  return allTags.value
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
});

const totalArticles = computed(() => {
  return allTags.value.reduce((sum, tag) => sum + tag.count, 0);
});

const filteredTags = computed(() => {
  if (!searchQuery.value) return [];
  
  return allTags.value.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleShowAll = () => {
  showAllTags.value = !showAllTags.value;
};

const selectTag = (tagName) => {
  emit('tag-change', tagName);
};

const clearTag = () => {
  emit('tag-change', '');
};

const filterTags = () => {
  // Reactive computed property handles filtering
};

const getTagSize = (count) => {
  const minSize = 0.75;
  const maxSize = 1.2;
  const maxCount = Math.max(...allTags.value.map(tag => tag.count));
  const ratio = count / maxCount;
  const size = minSize + (maxSize - minSize) * ratio;
  return `${size}rem`;
};

onMounted(() => {
  // Load tags from API in real application
});
</script>

<style scoped>
.tag-button {
  @apply inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 transform;
}

.tag-popular {
  @apply bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 hover:from-primary-200 hover:to-secondary-200 dark:hover:from-primary-900/50 dark:hover:to-secondary-900/50 border border-primary-200 dark:border-primary-800;
}

.tag-normal {
  @apply bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600;
}

.tag-active {
  @apply bg-primary-600 dark:bg-primary-500 text-white border-primary-600 dark:border-primary-500 shadow-lg;
}

.tag-count {
  @apply text-xs opacity-75 bg-white/20 px-1.5 py-0.5 rounded-full;
}
</style>
