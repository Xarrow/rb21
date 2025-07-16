<template>
  <footer class="bg-gray-900 text-white mt-20">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold gradient-text-white">ArticleHub</h3>
              <p class="text-gray-400 text-sm">现代化阅读体验</p>
            </div>
          </div>
          <p class="text-gray-400 mb-6 leading-relaxed">
            ArticleHub 致力于为用户提供高质量的内容阅读体验，汇聚全球优秀文章，让知识触手可及。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-6">快速链接</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                首页
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                热门文章
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                分类浏览
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                标签云
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                搜索
              </a>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-lg font-semibold mb-6">热门分类</h4>
          <ul class="space-y-3">
            <li v-for="category in categories" :key="category.name">
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-between group">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  {{ category.name }}
                </span>
                <span class="text-xs text-gray-500">{{ category.count }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact & Support -->
        <div>
          <h4 class="text-lg font-semibold mb-6">联系我们</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                联系邮箱
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                帮助中心
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                意见反馈
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                隐私政策
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group">
                <svg class="w-4 h-4 mr-2 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                服务条款
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            © {{ currentYear }} ArticleHub. All rights reserved. Made with ❤️ for readers worldwide.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

const categories = [
  { name: '科技', count: 156 },
  { name: '生活', count: 89 },
  { name: '娱乐', count: 67 },
  { name: '体育', count: 45 },
  { name: '财经', count: 34 }
];
</script>

<style scoped>
.gradient-bg {
  @apply bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600;
}

.gradient-text-white {
  @apply bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent;
}
</style>