<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md m-4" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ isEdit ? '编辑标签' : '创建标签' }}
          </h2>
        </div>

        <button
            @click="$emit('close')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-4">
          <!-- Tag Name -->
          <div>
            <label for="tag_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标签名称 *
            </label>
            <input
                id="tag_name"
                v-model="form.tag_name"
                type="text"
                maxlength="50"
                class="input-field"
                placeholder="请输入标签名称"
                :class="{ 'border-red-500 focus:ring-red-500': errors.tag_name }"
                required
            />
            <div class="flex justify-between items-center mt-1">
              <p v-if="errors.tag_name" class="text-sm text-red-600 dark:text-red-400">
                {{ errors.tag_name }}
              </p>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                {{ form.tag_name.length }}/50
              </span>
            </div>
          </div>

          <!-- Tag Description -->
          <div>
            <label for="tag_description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标签描述
            </label>
            <textarea
                id="tag_description"
                v-model="form.tag_description"
                maxlength="200"
                rows="3"
                class="input-field resize-none"
                placeholder="请输入标签描述（可选）"
            ></textarea>
            <div class="flex justify-between items-center mt-1">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ (form.tag_description || '').length }}/200
              </span>
            </div>
          </div>

          <!-- Status (only for edit) -->
          <div v-if="isEdit">
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              状态
            </label>
            <select
                id="status"
                v-model="form.status"
                class="input-field"
            >
              <option :value="1">正常</option>
              <option :value="0">禁用</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors duration-200"
              :disabled="isSubmitting"
          >
            取消
          </button>

          <button
              type="submit"
              class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              :disabled="!isValid || isSubmitting"
              :class="{ 'opacity-50 cursor-not-allowed': !isValid || isSubmitting }"
          >
            <svg v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? (isEdit ? '更新中...' : '创建中...') : (isEdit ? '更新标签' : '创建标签') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { tagApi } from '../services/api';

const props = defineProps({
  tag: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'save']);

const isSubmitting = ref(false);

const form = reactive({
  tag_name: '',
  tag_description: '',
  status: 1
});

const errors = reactive({
  tag_name: ''
});

const isValid = computed(() => {
  return form.tag_name.trim() && !errors.tag_name;
});

// Initialize form with tag data if editing
onMounted(() => {
  if (props.isEdit && props.tag) {
    form.tag_name = props.tag.tag_name || '';
    form.tag_description = props.tag.tag_description || '';
    form.status = props.tag.status || 1;
  }
});

// Validate form fields
const validateForm = () => {
  errors.tag_name = '';

  if (!form.tag_name.trim()) {
    errors.tag_name = '标签名称不能为空';
  } else if (form.tag_name.length > 50) {
    errors.tag_name = '标签名称不能超过50个字符';
  }

  return isValid.value;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    const data = {
      tag_name: form.tag_name.trim(),
      tag_description: form.tag_description?.trim() || ''
    };

    if (props.isEdit) {
      data.tag_id = props.tag.tag_id;
      data.status = form.status;
    }

    const response = props.isEdit
        ? await tagApi.updateTag(data)
        : await tagApi.createTag(data);

    if (response.success) {
      emit('save');
    } else {
      throw new Error(response.message || '操作失败');
    }
  } catch (error) {
    console.error('Tag save error:', error);
    if (error.message.includes('标签名称')) {
      errors.tag_name = error.message;
    } else {
      // Handle other errors via toast in parent component
      throw error;
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>