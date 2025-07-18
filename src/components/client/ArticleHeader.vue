<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 "
          :class="{ 'shadow-lg': scrolled }">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold gradient-text">ArticleHub</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">现代化阅读体验</p>
          </div>
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <button
              v-for="category in categories"
              :key="category.name"
              @click="handleCategoryClick(category.name)"
              class="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400 group"
              :class="isActiveCategory(category.name) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'"
          >
            {{ category.name }}
            <span class="ml-1 text-xs opacity-60">({{ category.count }})</span>
            <div v-if="isActiveCategory(category.name)"
                 class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
          </button>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative hidden sm:block">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索文章..."
                class="w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200"
                @keyup.enter="handleSearch"
                @input="handleSearchInput"
            />
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
              @click="toggleTheme"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              title="切换主题"
          >
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>

          <!-- Mobile Menu -->
          <button
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <!-- Mobile Search -->
        <div class="relative mb-4">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章..."
              class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              @keyup.enter="handleSearch"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <!-- Mobile Categories -->
        <div class="space-y-2">
          <button
              v-for="category in categories"
              :key="category.name"
              @click="handleMobileCategoryClick(category.name)"
              class="block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
              :class="isActiveCategory(category.name)
              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
          >
            {{ category.name }}
            <span class="ml-1 text-xs opacity-60">({{ category.count }})</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory: {
    type: String,
    default: '全部'
  }
});

const emit = defineEmits(['category-change', 'search']);

// State
const scrolled = ref(false);
const isDark = ref(false);
const searchQuery = ref('');
const showMobileMenu = ref(false);
let searchTimeout = null;

// Methods
const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const handleCategoryClick = (categoryName) => {
  emit('category-change', categoryName === '全部' ? '' : categoryName);
};

const handleMobileCategoryClick = (categoryName) => {
  showMobileMenu.value = false;
  handleCategoryClick(categoryName);
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim());
    showMobileMenu.value = false;
  }
};

const handleSearchInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (searchQuery.value.trim()) {
      emit('search', searchQuery.value.trim());
    }
  }, 500);
};

const clearSearch = () => {
  searchQuery.value = '';
  emit('search', '');
};

const isActiveCategory = (categoryName) => {
  return props.selectedCategory === categoryName ||
      (props.selectedCategory === '' && categoryName === '全部');
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  // Load theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  document.documentElement.classList.toggle('dark', isDark.value);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  clearTimeout(searchTimeout);
});
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent;
}

.gradient-bg {
  @apply bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600;
}
</style>