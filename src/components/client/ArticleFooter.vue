<template>
  <footer class="bg-gray-900 text-white mt-3">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col items-center justify-center space-y-4">
        <!-- Funny Links - Responsive -->
        <div class="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 items-center">
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm px-2 py-1">
            关于我们（其实没啥好说的）
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm px-2 py-1">
            隐私政策（我们保证不看你的浏览记录）
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm px-2 py-1">
            服务条款（反正没人看）
          </a>
          <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm px-2 py-1">
            联系我们（不一定回）
          </a>
        </div>

        <!-- Funny Copyright -->
        <div class="text-gray-500 text-sm text-center">
          © {{ new Date().getFullYear() }} ArticleHub. 版权所有，盗版必究（才怪）<br>
          本网站内容纯属娱乐，如有雷同，那一定是巧合
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed
</script>
