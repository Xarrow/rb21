<template>
  <!-- Floating Ad Banner -->
  <div class="fixed top-20 right-4 z-40 w-80 space-y-4">
    <!-- Standard Banner Ad -->
    <div class="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800 relative overflow-hidden shadow-lg backdrop-blur-sm">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <div class="relative z-10">
        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          优质内容推荐
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          发现更多精彩文章，提升阅读体验
        </p>
        <button class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
          了解更多
        </button>
      </div>
    </div>

    <!-- Compact Ad -->
    <div class="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border border-green-200 dark:border-green-800 shadow-lg backdrop-blur-sm">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            学习资源
          </h5>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            精选教程与工具推荐
          </p>
        </div>
        <button class="px-3 py-1 bg-green-500 text-white rounded-md text-xs font-medium hover:bg-green-600 transition-colors duration-200">
          查看
        </button>
      </div>
    </div>

    <!-- Newsletter Signup -->
    <div class="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl p-6 border border-orange-200 dark:border-orange-800 shadow-lg backdrop-blur-sm">
      <div class="text-center mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <h4 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
          订阅更新
        </h4>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-4">
          获取最新文章推送
        </p>
      </div>

      <div class="space-y-3">
        <input
            type="email"
            placeholder="输入邮箱地址"
            class="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button class="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200">
          立即订阅
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Lazy loading implementation would go here
</script>