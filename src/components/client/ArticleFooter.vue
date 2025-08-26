<template>
  <footer class="bg-gray-900 text-white mt-3 font-serif relative overflow-hidden">
    <div class="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="a" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 0h40v40H0z" fill="none"/>
            <path d="M20 0v40M0 20h40" stroke="#fff" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#a)"/>
      </svg>
    </div>
    <div class="container mx-auto px-4 py-8 relative">
      <div class="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-10">
        <!-- Left Side: Introduction Text -->
        <div class="w-full md:w-1/2 text-gray-300 text-sm">
          <h3 class="text-lg font-bold text-white mb-3 tracking-wider">随便看看</h3>
          <p class="mb-2 leading-relaxed">生活琐碎,工作疲惫,已经够累了</p>
          <p class="mb-2 leading-relaxed">有时候，一个小梗图、一张奇奇怪怪，可可爱爱的图片，就能赶跑一整天的疲憊。</p>
          <p class="text-gray-400 mt-4 font-bold text-sm italic">“此中有真意，欲辨已忘言。”</p>
        </div>

        <!-- Divider -->
        <div class="hidden md:block w-px bg-gray-700 h-auto"></div>

        <!-- Right Side: Links and Copyright -->
        <div class="w-full md:w-1/2 flex flex-col items-start md:items-end space-y-4">
          <!-- Funny Links -->
          <div class="flex flex-col items-start md:items-end space-y-2">
            <a href="#" class="flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>关于我们（其实没啥好说的）</span>
            </a>
            <a href="#" class="flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>联系我们（不一定回）</span>
            </a>
          </div>
          <!-- Funny Copyright -->
          <div class="text-gray-500 text-sm text-left md:text-right mt-4 pt-4 w-full">
            <p>© 叽里咕噜 {{ new Date().getFullYear() }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block text-red-500 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"/>
              </svg>
              Vue.js
            </p>
            <p class="mt-1">版权所有，盗版必究（才怪）| 本网站内容纯属娱乐，如有雷同，那一定是巧合</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed
</script>
