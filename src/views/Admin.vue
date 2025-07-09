<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Sidebar -->
    <div
        class="bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out"
        :class="sidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo and Toggle -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'">
        <div v-show="!sidebarCollapsed" class="flex items-center space-x-3">
          <h1 class="text-xl font-bold gradient-text"> 后台管理 </h1>
        </div>

        <!-- Collapsed state logo -->
        <div v-show="sidebarCollapsed" class="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zM15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
          </svg>
        </div>

        <button
            v-show="!sidebarCollapsed"
            @click="toggleSidebar"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
        >
          <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': sidebarCollapsed }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Collapsed state toggle button -->
      <div v-show="sidebarCollapsed" class="px-4 pb-2">
        <button
            @click="toggleSidebar"
            class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
            title="展开侧边栏"
        >
          <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <button
                @click="activeTab = 'create'"
                class="w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 group relative"
                :class="[
                activeTab === 'create'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
                :title="sidebarCollapsed ? '发布文章' : ''"
            >
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span v-show="!sidebarCollapsed" class="ml-3">发布文章</span>

              <!-- Tooltip for collapsed state -->
              <div
                  v-if="sidebarCollapsed"
                  class="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
              >
                发布文章
              </div>
            </button>
          </li>
          <li>
            <button
                @click="activeTab = 'images'"
                class="w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 group relative"
                :class="[
                activeTab === 'images'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
                :title="sidebarCollapsed ? '图片管理' : ''"
            >
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span v-show="!sidebarCollapsed" class="ml-3">图片管理</span>

              <!-- Tooltip for collapsed state -->
              <div
                  v-if="sidebarCollapsed"
                  class="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
              >
                图片管理
              </div>
            </button>
          </li>
          <li>
            <button
                @click="activeTab = 'articles'"
                class="w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200 group relative"
                :class="[
                activeTab === 'articles'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
                :title="sidebarCollapsed ? '文章管理' : ''"
            >
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span v-show="!sidebarCollapsed" class="ml-3">文章管理</span>

              <!-- Tooltip for collapsed state -->
              <div
                  v-if="sidebarCollapsed"
                  class="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
              >
                文章管理
              </div>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <router-link
            to="/"
            class="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 group relative"
            :class="sidebarCollapsed ? 'justify-center' : 'space-x-2'"
            :title="sidebarCollapsed ? '返回首页' : ''"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span v-show="!sidebarCollapsed" class="text-sm">返回首页</span>

          <!-- Tooltip for collapsed state -->
          <div
              v-if="sidebarCollapsed"
              class="absolute left-12 ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
          >
            返回首页
          </div>
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Content Area -->
      <main class="flex-1 overflow-hidden">
        <div v-show="activeTab === 'create'" class="h-full">
          <CreatePostContent/>
        </div>

        <!-- Image Management Tab -->
        <div v-show="activeTab === 'images'" class="h-full p-6">
          <ImageManagerContent/>
        </div>

        <!-- Article Management Tab -->
        <div v-show="activeTab === 'articles'" class="h-full">
          <ArticleManagement/>
        </div>
      </main>
    </div>

    <!-- Toast Messages -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
          class="px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          :class="toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
      >
        <svg v-if="toast.type === 'success'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"/>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import CreatePostContent from '../components/CreatePostContent.vue';
import ImageManagerContent from '../components/ImageManagerContent.vue';
import ArticleManagement from '../components/ArticleManagement.vue';

const activeTab = ref('create');
const sidebarCollapsed = ref(false);
const toast = ref({show: false, type: 'success', message: ''});

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  // Save sidebar state to localStorage
  localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value.toString());
};

const showToast = (type, message) => {
  toast.value = {show: true, type, message};
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

onMounted(() => {
  // Restore sidebar state from localStorage
  const savedState = localStorage.getItem('sidebarCollapsed');
  if (savedState !== null) {
    sidebarCollapsed.value = savedState === 'true';
  }
});
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent;
}

/* Ensure tooltips appear above other elements */
.group:hover .absolute {
  z-index: 50;
}
</style>