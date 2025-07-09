<template>
  <div class="h-full flex flex-col p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          文章管理
          <span v-if="totalArticles > 0" class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            (共 {{ totalArticles }} 篇)
          </span>
        </h2>
      </div>

      <button
          @click="showCreateModal = true"
          class="btn-primary inline-flex items-center"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        新建文章
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <!-- Title Search -->
        <div>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <input
                v-model="searchFilters.article_title"
                type="text"
                placeholder="搜索标题..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <!-- Author Search -->
        <div>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <input
                v-model="searchFilters.article_author"
                type="text"
                placeholder="搜索作者..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <!-- Source Search -->
        <div>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <input
                v-model="searchFilters.article_source"
                type="text"
                placeholder="搜索来源..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <!-- Status Filter -->
        <div>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2zm8 0h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z"/>
            </svg>
            <select
                v-model="searchFilters.status"
                class="w-full pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm appearance-none"
            >
              <option :value="null">全部状态</option>
              <option :value="0">草稿</option>
              <option :value="1">已发布</option>
              <option :value="2">已下线</option>
            </select>
            <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Advanced Filters -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <!-- Sort Options -->
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
            </svg>
            <select
                v-model="searchFilters.order_by"
                class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="update_time">更新时间</option>
              <option value="create_time">创建时间</option>
              <option value="article_title">标题</option>
            </select>
            <button
                @click="searchFilters.desc_order = !searchFilters.desc_order"
                class="p-1.5 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                :title="searchFilters.desc_order ? '降序' : '升序'"
            >
              <svg
                  class="w-3 h-3 text-gray-600 dark:text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': !searchFilters.desc_order }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Search Actions -->
        <div class="flex items-center space-x-1">
          <button
              @click="resetFilters"
              class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm font-medium transition-colors duration-200"
          >
            <svg class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            重置
          </button>
          <button
              @click="searchArticles"
              class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition-colors duration-200"
              :disabled="isLoading"
          >
            <svg v-if="isLoading" class="w-3 h-3 mr-1 animate-spin inline" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            搜索
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-hidden">
      <!-- Loading -->
      <div v-if="isLoading" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
          <button @click="loadArticles()" class="btn-primary">重新加载</button>
        </div>
      </div>

      <!-- Empty -->
      <div v-else-if="articles.length === 0" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-gray-500 dark:text-gray-400 mb-4">没有找到符合条件的文章</p>
          <button @click="showCreateModal = true" class="btn-primary">创建第一篇文章</button>
        </div>
      </div>

      <!-- Article List -->
      <div v-else class="flex-1 overflow-y-auto">
        <div class="space-y-4">
          <div
              v-for="article in articles"
              :key="article.article_id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800"
          >
            <div class="flex items-start justify-between w-full">
              <div class="p-6 flex-1">
                <div class="flex items-start space-x-4">
                  <!-- Head Image -->
                  <div v-if="article.article_head_image" class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img
                        :src="article.article_head_image"
                        :alt="article.article_title"
                        class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        @error="onImageError"
                    />
                  </div>

                  <!-- Placeholder for articles without image -->
                  <div v-else class="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center flex-shrink-0">
                    <svg class="w-8 h-8 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>

                  <!-- Article Content -->
                  <div class="flex-1 min-w-0">
                    <!-- Title - clickable -->
                    <h3
                        @click="editArticle(article)"
                        class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 line-clamp-2"
                    >
                      {{ article.article_title }}
                    </h3>

                    <!-- Summary -->
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {{ article.article_summary || '暂无摘要' }}
                    </p>

                    <!-- Meta info -->
                    <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <div class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span>{{ article.article_author || '未知作者' }}</span>
                      </div>
                      <div class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                        <span>{{ article.article_source || '未知来源' }}</span>
                      </div>
                    </div>

                    <!-- Time info -->
                    <div class="flex flex-wrap items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                      <div class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        <span>创建: {{ formatDate(article.create_time) }}</span>
                      </div>
                      <div class="flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        <span>更新: {{ formatDate(article.update_time) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status and Actions -->
              <div class="flex flex-col items-end space-y-3 p-6">
                <!-- Status Badge -->
                <span
                    class="px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
                    :class="getStatusClass(article.status)"
                >
                  {{ getStatusText(article.status) }}
                </span>

                <!-- Action Buttons -->
                <div class="flex items-center space-x-1">
                  <button
                      @click.stop="viewArticle(article)"
                      class="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      title="查看详情"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button
                      @click.stop="editArticle(article)"
                      class="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      title="编辑"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                      @click.stop="deleteArticle(article)"
                      class="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="删除"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
              @click="loadArticles(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <!-- Page Numbers -->
          <div class="flex items-center space-x-1">
            <template v-for="page in getPageNumbers()" :key="page">
              <button
                  v-if="page !== '...'"
                  @click="loadArticles(page)"
                  class="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  :class="page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 text-gray-400">...</span>
            </template>
          </div>

          <button
              @click="loadArticles(currentPage + 1)"
              :disabled="currentPage >= totalPages"
              class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <ArticleModal
        v-if="showCreateModal || showEditModal"
        :article="editingArticle"
        :is-edit="showEditModal"
        @close="closeModal"
        @save="handleSave"
    />

    <!-- View Modal -->
    <ArticleViewModal
        v-if="showViewModal"
        :article="viewingArticle"
        @close="showViewModal = false"
        @edit="editArticle"
        @delete="deleteArticle"
    />

    <!-- Toast Messages -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
          class="px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          :class="toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
      >
        <svg v-if="toast.type === 'success'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { articleApi } from '../services/api';
import ArticleModal from './ArticleModal.vue';
import ArticleViewModal from './ArticleViewModal.vue';

// State
const articles = ref([]);
const isLoading = ref(false);
const error = ref('');
const toast = ref({ show: false, type: 'success', message: '' });

// Search filters
const searchFilters = reactive({
  article_title: '',
  article_author: '',
  article_source: '',
  status: null,
  order_by: 'update_time',
  desc_order: true
});

// Pagination
const currentPage = ref(1);
const pageSize = ref(10);
const totalArticles = ref(0);
const totalPages = ref(0);

// Modals
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showViewModal = ref(false);
const editingArticle = ref(null);
const viewingArticle = ref(null);

// Methods
const loadArticles = async (page = 1) => {
  isLoading.value = true;
  error.value = '';

  try {
    // Build query parameters
    const params = {
      page,
      per_page: pageSize.value,
      ...searchFilters
    };

    // Remove empty values
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });

    const response = await articleApi.queryListBySelective(params);

    if (response.success) {
      articles.value = response.data;
      totalArticles.value = response.total;
      totalPages.value = response.total_pages;
      currentPage.value = response.page;
    } else {
      error.value = response.message;
    }
  } catch (err) {
    error.value = '网络错误，请重试';
  } finally {
    isLoading.value = false;
  }
};

const searchArticles = () => {
  currentPage.value = 1;
  loadArticles(1);
};

const resetFilters = () => {
  searchFilters.article_title = '';
  searchFilters.article_author = '';
  searchFilters.article_source = '';
  searchFilters.status = null;
  searchFilters.order_by = 'update_time';
  searchFilters.desc_order = true;
  searchArticles();
};

const viewArticle = async (article) => {
  try {
    const response = await articleApi.getArticleDetail(article.article_id);
    if (response.success) {
      viewingArticle.value = response.data;
      showViewModal.value = true;
    } else {
      showToast('error', response.message || '获取文章详情失败');
    }
  } catch (err) {
    showToast('error', '获取文章详情失败');
  }
};

const editArticle = async (article) => {
  try {
    const response = await articleApi.getArticleDetail(article.article_id);
    if (response.success) {
      editingArticle.value = response.data;
      showEditModal.value = true;
      showViewModal.value = false;
    } else {
      showToast('error', response.message || '获取文章详情失败');
    }
  } catch (err) {
    showToast('error', '获取文章详情失败');
  }
};

const deleteArticle = async (article) => {
  if (!confirm(`确定要删除文章 "${article.article_title}" 吗？`)) {
    return;
  }

  try {
    const response = await articleApi.deleteArticle(article.article_id);

    if (response.success) {
      showToast('success', '文章已删除');
      showViewModal.value = false;
      loadArticles(currentPage.value);
    } else {
      showToast('error', response.message || '删除失败');
    }
  } catch (err) {
    showToast('error', '删除失败，请重试');
  }
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  editingArticle.value = null;
};

const handleSave = () => {
  closeModal();
  loadArticles(currentPage.value);
  showToast('success', showEditModal.value ? '文章已更新' : '文章已创建');
};

const getStatusClass = (status) => {
  const classes = {
    0: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600',
    1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800',
    2: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800'
  };
  return classes[status] || classes[0];
};

const getStatusText = (status) => {
  const texts = {
    0: '草稿',
    1: '已发布',
    2: '已下线'
  };
  return texts[status] || '未知';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getPageNumbers = () => {
  const pages = [];
  const maxVisible = 7;

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages.value);
    } else if (currentPage.value >= totalPages.value - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages.value - 4;
           i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages.value);
    }
  }

  return pages;
};

const onImageError = (event) => {
  event.target.style.display = 'none';
};

const showToast = (type, message) => {
  toast.value = { show: true, type, message };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

// Auto search on filter changes (debounced)
let searchTimeout;
watch(searchFilters, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (searchFilters.article_title || searchFilters.article_author || searchFilters.article_source || searchFilters.status !== null) {
      searchArticles();
    }
  }, 500);
}, { deep: true });

onMounted(() => {
  loadArticles();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
