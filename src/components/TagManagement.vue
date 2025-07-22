<template>
  <div class="h-full flex flex-col p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          标签管理
          <span v-if="totalTags > 0" class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            (共 {{ totalTags }} 个)
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
        新建标签
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- Status Filter -->
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">状态:</label>
            <select
                v-model="statusFilter"
                @change="loadTags(1, true)"
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option :value="null">全部状态</option>
              <option :value="1">正常</option>
              <option :value="0">禁用</option>
            </select>
          </div>
        </div>

        <button
            @click="refreshTags"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            title="刷新"
            :disabled="isLoading"
        >
          <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-400"
              :class="{ 'animate-spin': isLoading }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
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
          <button @click="loadTags()" class="btn-primary">重新加载</button>
        </div>
      </div>

      <!-- Empty -->
      <div v-else-if="tags.length === 0" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
          </svg>
          <p class="text-gray-500 dark:text-gray-400 mb-4">没有找到标签</p>
          <button @click="showCreateModal = true" class="btn-primary">创建第一个标签</button>
        </div>
      </div>

      <!-- Tags Grid -->
      <div v-else class="flex-1 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
              v-for="tag in tags"
              :key="tag.tag_id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 p-6"
          >
            <!-- Tag Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-x-4">
                <!-- Icon block -->
                <div class="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
    <span v-if="tag.tag_name">
      {{ tag.tag_name.charAt(0).toUpperCase() }}
    </span>
                </div>

                <!-- Tag info -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {{ tag.tag_name }}
                  </h3>
                  <span
                      class="inline-flex items-center mt-1 px-2 py-0.5 text-xs font-medium rounded-full"
                      :class="getStatusClass(tag.status)"
                  >
      {{ getStatusText(tag.status) }}
    </span>
                </div>
              </div>


              <!-- Actions Dropdown -->
              <div class="relative">
                <button
                    @click="toggleDropdown(tag.tag_id)"
                    class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                    v-if="activeDropdown === tag.tag_id"
                    class="absolute right-0 top-8 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[120px]"
                >
                  <button
                      @click="editTag(tag)"
                      class="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    编辑
                  </button>
                  <button
                      @click="toggleTagStatus(tag)"
                      class="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {{ tag.status === 1 ? '禁用' : '启用' }}
                  </button>
<!--                  <button-->
<!--                      @click="softDeleteTag(tag)"-->
<!--                      class="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"-->
<!--                  >-->
<!--                    禁用-->
<!--                  </button>-->
                  <button
                      @click="physicsDeleteTag(tag)"
                      class="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    物理删除
                  </button>
                </div>
              </div>
            </div>

            <!-- Tag Description -->
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {{ tag.tag_description || '暂无描述' }}
            </p>

            <!-- Tag Meta -->
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ formatDate(tag.create_time) }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                <span>{{ formatDate(tag.update_time) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
              @click="loadTags(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <span class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
              @click="loadTags(currentPage + 1)"
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
    <TagModal
        v-if="showCreateModal || showEditModal"
        :tag="editingTag"
        :is-edit="showEditModal"
        @close="closeModal"
        @save="handleSave"
    />

    <ToastMessage/>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {tagApi} from '../services/api';
import TagModal from './TagModal.vue';
import ToastMessage from './ToastMessage.vue';
import {useToast} from '../composables/useToast';

// State
const tags = ref([]);
const isLoading = ref(false);
const error = ref('');
const statusFilter = ref(null);
const activeDropdown = ref(null);

// Toast
const {showToast} = useToast();

// Pagination
const currentPage = ref(1);
const pageSize = ref(12);
const totalTags = ref(0);
const totalPages = ref(0);

// Modals
const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingTag = ref(null);

// Methods
const loadTags = async (page = 1, reset = false) => {
  isLoading.value = true;
  error.value = '';

  try {
    const response = await tagApi.getTagList(page, pageSize.value, statusFilter.value);

    if (response.success && response.data) {
      if (reset) {
        tags.value = response.data.data || [];
      } else {
        tags.value = response.data.data || [];
      }

      totalTags.value = response.data.total || 0;
      totalPages.value = response.data.total_pages || 0;
      currentPage.value = response.data.page || page;
    } else {
      error.value = response.message || '加载标签失败';
    }
  } catch (err) {
    error.value = '网络错误，请重试';
  } finally {
    isLoading.value = false;
  }
};

const refreshTags = () => {
  loadTags(currentPage.value);
};

const editTag = (tag) => {
  editingTag.value = {...tag};
  showEditModal.value = true;
  activeDropdown.value = null;
};

const physicsDeleteTag = async (tag) => {
  if (!confirm(`确定要物理删除标签 "${tag.tag_name}" 吗？不可恢复`)) {
    return;
  }

  try {
    const response = await tagApi.deleteTag(tag.tag_id, false);

    if (response.success || response.data === true) {
      showToast('success', '标签已物理删除');
      loadTags(currentPage.value);
    } else {
      showToast('error', response.message || '物理删除失败');
    }
  } catch (err) {
    showToast('error', '物理删除失败，请重试');
  } finally {
    activeDropdown.value = null;
  }
};
const softDeleteTag = async (tag) => {
  if (!confirm(`确定要禁用标签 "${tag.tag_name}" 吗？`)) {
    return;
  }

  try {
    const response = await tagApi.deleteTag(tag.tag_id);

    if (response.success || response.data === true) {
      showToast('success', '标签已禁用');
      loadTags(currentPage.value);
    } else {
      showToast('error', response.message || '禁用失败');
    }
  } catch (err) {
    showToast('error', '禁用失败，请重试');
  } finally {
    activeDropdown.value = null;
  }
};

const toggleTagStatus = async (tag) => {
  const newStatus = tag.status === 1 ? 0 : 1;

  try {
    const response = await tagApi.updateTag({
      tag_id: tag.tag_id,
      status: newStatus
    });

    if (response.success) {
      tag.status = newStatus;
      showToast('success', `标签已${newStatus === 1 ? '启用' : '禁用'}`);
    } else {
      showToast('error', response.message || '状态更新失败');
    }
  } catch (err) {
    showToast('error', '状态更新失败，请重试');
  } finally {
    activeDropdown.value = null;
  }
};

const toggleDropdown = (tagId) => {
  activeDropdown.value = activeDropdown.value === tagId ? null : tagId;
};

const closeModal = () => {
  showCreateModal.value = false;
  showEditModal.value = false;
  editingTag.value = null;
};

const handleSave = () => {
  closeModal();
  loadTags(currentPage.value);
  showToast('success', showEditModal.value ? '标签已更新' : '标签已创建');
};

const getStatusClass = (status) => {
  return status === 1
      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
};

const getStatusText = (status) => {
  return status === 1 ? '正常' : '禁用';
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

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (activeDropdown.value && !event.target.closest('.relative')) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  loadTags();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
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