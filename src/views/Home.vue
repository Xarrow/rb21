<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center space-x-3 mb-6">
          <div class="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zM15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
            </svg>
          </div>
        </div>

        <h1 class="text-5xl font-bold gradient-text mb-6">
          Welcome to Thread
        </h1>

        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          Share your thoughts, ideas, and stories with our community.
          Create beautiful posts with markdown support and connect with like-minded individuals.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <router-link to="/create" class="btn-primary inline-flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Create Your First Post
          </router-link>

          <button
            @click="scrollToFeatures"
            class="btn-secondary inline-flex items-center"
          >
            Learn More
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Features Section -->
      <div id="features" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Markdown Support
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Write rich content with full markdown support. Format your posts with headers, lists, code blocks, and more.
          </p>
        </div>

        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Live Preview
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            See your content rendered in real-time as you type. What you see is what you get with our live preview feature.
          </p>
        </div>

        <div class="card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Fast & Responsive
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Built with modern technologies for lightning-fast performance and beautiful responsive design across all devices.
          </p>
        </div>
      </div>

      <!-- Getting Started Section -->
      <div class="card p-12 text-center gradient-bg text-white">
        <h2 class="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
        <p class="text-xl mb-8 opacity-90">
          Join our community and start creating engaging content today.
        </p>
        <router-link to="/create" class="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Get Started Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const scrollToFeatures = () => {
  const element = document.getElementById('features');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent;
}
</style>