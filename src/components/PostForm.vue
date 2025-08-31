<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Post</h3>
      <div class="flex items-center space-x-2">
        <span
            class="text-sm px-2 py-1 rounded-full"
            :class="isValid ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'"
        >
          {{ isValid ? 'Ready to post' : 'Fill required fields' }}
        </span>
      </div>
    </div>

    <div class="flex-1 overflow-hidden">
      <form @submit.prevent="handleSubmit" class="h-full flex flex-col overflow-hidden">
        <!-- Scrollable Form Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <!-- Title -->
          <div class="space-y-1">
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Post Title *
            </label>
            <input
                id="title"
                v-model="form.article_title"
                type="text"
                maxlength="128"
                class="input-field"
                placeholder="Enter your post title..."
                :class="{ 'border-red-500 focus:ring-red-500': errors.article_title }"
                style="padding: 8px 12px; font-size: 14px;"
            />
            <div class="flex justify-between items-center">
              <p v-if="errors.article_title" class="text-sm text-red-600 dark:text-red-400">
                {{ errors.article_title }}
              </p>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                {{ form.article_title.length }}/128
              </span>
            </div>
          </div>

          <!-- Source -->
          <div class="space-y-1">
            <label for="source" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source *
            </label>
            <input
                id="source"
                v-model="form.article_source"
                type="text"
                maxlength="128"
                class="input-field"
                placeholder="Enter the source (e.g., your name, organization)..."
                :class="{ 'border-red-500 focus:ring-red-500': errors.article_source }"
                style="padding: 8px 12px; font-size: 14px;"
            />
            <div class="flex justify-between items-center">
              <p v-if="errors.article_source" class="text-sm text-red-600 dark:text-red-400">
                {{ errors.article_source }}
              </p>
              <span class="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                {{ form.article_source.length }}/128
              </span>
            </div>
          </div>

          <!-- Source Link -->
          <div class="space-y-1">
            <label for="source_link" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Source Link
              <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(optional)</span>
            </label>
            <input
                id="source_link"
                v-model="form.article_source_link"
                type="url"
                class="input-field"
                placeholder="https://example.com"
                style="padding: 8px 12px; font-size: 14px;"
            />
          </div>

          <!-- Author -->
          <div class="space-y-1">
            <label for="author" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Author
              <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(optional)</span>
            </label>
            <input
                id="author"
                v-model="form.article_author"
                type="text"
                maxlength="128"
                class="input-field"
                placeholder="Author name"
                style="padding: 8px 12px; font-size: 14px;"
            />
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ (form.article_author || '').length }}/128
              </span>
            </div>
          </div>

          <!-- Summary -->
          <div class="space-y-1">
            <label for="summary" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Summary
              <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(optional, will be auto-generated if empty)</span>
            </label>
            <textarea
                id="summary"
                v-model="form.article_summary"
                maxlength="128"
                rows="3"
                class="input-field resize-none"
                placeholder="Brief summary of your post..."
                style="padding: 8px 12px; font-size: 14px;"
            ></textarea>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ (form.article_summary || '').length }}/128
              </span>
            </div>
          </div>

          <!-- Head Image -->
          <div class="space-y-1">
            <label for="head_image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Head Image URL
              <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(optional, will be auto-generated if empty)</span>
            </label>
            <input
                id="head_image"
                v-model="form.article_head_image"
                type="url"
                maxlength="512"
                class="input-field"
                placeholder="https://example.com/image.jpg"
                style="padding: 8px 12px; font-size: 14px;"
            />
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ (form.article_head_image || '').length }}/512
              </span>
            </div>
            <!-- Image Preview -->
            <div v-if="form.article_head_image && isValidImageUrl(form.article_head_image)" class="mt-2">
              <img
                  :src="form.article_head_image"
                  alt="Head image preview"
                  class="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                  @error="onImageError"
                  @load="onImageLoad"
              />
            </div>
          </div>

          <!-- Tags -->
          <div class="space-y-1">
            <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              标签
              <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(optional)</span>
            </label>
            <div v-if="loadingTags" class="text-sm text-gray-500 dark:text-gray-400">
              Loading tags...
            </div>
            <div v-else class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in availableTags"
                  :key="tag.tag_id"
                  @click="toggleTagSelection(tag.tag_id)"
                  class="px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-200 flex items-center"
                  :class="getTagClass(tag.tag_id)"
                >
                  <span>{{ tag.tag_name }}</span>
                  <svg
                    v-if="isCurrentTag(tag.tag_id)"
                    class="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                已选择: {{ form.article_tags.length }} 个标签
              </div>
            </div>
          </div>

          <!-- Display Style -->
          <div class="space-y-1">
            <label for="article_category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              分类
            </label>
            <select
                id="article_category"
                v-model="form.article_category"
                class="input-field"
                style="padding: 8px 12px; font-size: 14px;"
            >
              <option
                  v-for="option in showStyleOptions"
                  :key="option.value"
                  :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Status -->
          <div class="space-y-1">
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              发布状态
            </label>
            <select
                id="status"
                v-model="form.status"
                class="input-field"
                style="padding: 8px 12px; font-size: 14px;"
            >
              <option
                  v-for="option in statusOptions"
                  :key="option.value"
                  :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Content -->
          <div class="space-y-1 flex-1 flex flex-col">
            <div class="flex items-center justify-between">
              <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content *
                <span class="text-xs font-normal text-gray-500 dark:text-gray-400">(Markdown supported, Ctrl+V to paste images)</span>
              </label>
              <div class="flex items-center space-x-2">
                <div v-if="isUploadingImage" class="flex items-center space-x-2 text-xs text-primary-600 dark:text-primary-400">
                  <div class="w-3 h-3 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <span>上传中...</span>
                </div>
                <button
                    type="button"
                    @click="insertMarkdownSyntax"
                    class="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Markdown Help
                </button>
              </div>
            </div>
            <textarea
                id="content"
                v-model="form.article_content"
                class="input-field flex-1 resize-none font-mono"
                placeholder="Write your post content here... (Markdown syntax supported, paste images with Ctrl+V)

Example:
# Heading
**Bold text**
*Italic text*
- List item
[Link](https://example.com)
)
```code```"
                :class="{ 'border-red-500 focus:ring-red-500': errors.article_content }"
                style="padding: 12px; font-size: 14px; min-height: 200px;"
                :disabled="isUploadingImage"
            ></textarea>
            <p v-if="errors.article_content" class="text-sm text-red-600 dark:text-red-400">
              {{ errors.article_content }}
            </p>
          </div>
        </div>

        <!-- Fixed Actions Footer -->
        <div class="flex-shrink-0 flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
              type="button"
              @click="resetForm"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-all duration-200"
              :disabled="isSubmitting"
          >
            Clear
          </button>

          <button
              type="submit"
              class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              :disabled="!isValid || isSubmitting"
              :class="{ 'opacity-50 cursor-not-allowed': !isValid || isSubmitting }"
          >
            <svg v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Publishing...' : 'Publish Post' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, reactive, watch, onMounted} from 'vue';
import {imageApi, tagApi} from '../services/api';

const emit = defineEmits(['update:content']);

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  },
  initialData: {
    type: Object,
    default: null
  }
});

const isSubmitting = ref(false);
const isUploadingImage = ref(false);

const form = reactive({
  article_title: '',
  article_content: '',
  article_source: '',
  article_source_link: '',
  article_author: '',
  article_summary: '',
  article_head_image: '',
  article_head_image_width: 0,
  article_head_image_height: 0,
  article_tags: [],
  article_category: 'article',
  status: 1
});

const errors = reactive({
  article_title: '',
  article_content: '',
  article_source: '',
});

const availableTags = ref([]);
const currentTags = ref([]);

const loadingTags = ref(false);

const showStyleOptions = [
  {value: 'chaosCategory', label: '薛定谔的分类'},
  {value: 'highWords', label: '当代废话文学'},
  {value: 'highResource', label: '互联网生存物资'},
  {value: 'highImages', label: '精神污染浓度99%'}
];

const statusOptions = [
  {value: 1, label: '发布'},
  {value: 0, label: '草稿'}
];

const isValid = computed(() => {
  return form.article_title.trim() &&
      form.article_content.trim() &&
      form.article_source.trim() &&
      !errors.article_title &&
      !errors.article_content &&
      !errors.article_source;
});

// Load tags
const loadTags = async () => {
  loadingTags.value = true;
  try {
    const response = await tagApi.getTagList(1, 100, 1);
    if (response.success && response.data) {
      availableTags.value = response.data.data || [];
    } else {
      console.error('Failed to load tags:', response.message);
      availableTags.value = [];
    }
  } catch (error) {
    console.error('Failed to load tags:', error);
    availableTags.value = [];
  } finally {
    loadingTags.value = false;
  }
};

// Initialize form with initial data if provided
onMounted(() => {
  loadTags();
  if (props.initialData) {
    Object.keys(form).forEach(key => {
      if (props.initialData[key] !== undefined) {
        form[key] = props.initialData[key];
      }
    });
    
    // Set current tags if available
    if (props.initialData.current_tags) {
      currentTags.value = props.initialData.current_tags;
      form.article_tags = currentTags.value.map(tag => tag.tag_id);
    }
    
    emit('update:content', form.article_content);
  }

  // 添加粘贴事件监听
  const contentTextarea = document.getElementById('content');
  if (contentTextarea) {
    contentTextarea.addEventListener('paste', handlePaste);
  }
});

// Watch for content changes to emit to parent
const updateContent = () => {
  emit('update:content', form.article_content);
};

// 处理粘贴事件
const handlePaste = async (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.startsWith('image/')) {
      event.preventDefault();
      const file = item.getAsFile();
      if (file) {
        await uploadAndInsertImage(file);
      }
      break;
    }
  }
};

// 上传图片并插入到编辑器
const uploadAndInsertImage = async (file) => {
  try {
    isUploadingImage.value = true;

    // 获取当前光标位置
    const textarea = document.getElementById('content');
    const cursorPosition = textarea ? textarea.selectionStart : form.article_content.length;

    // 先插入占位符
    const placeholder = `![Uploading...](uploading)`;
    const beforeCursor = form.article_content.substring(0, cursorPosition);
    const afterCursor = form.article_content.substring(cursorPosition);
    form.article_content = beforeCursor + placeholder + afterCursor;
    updateContent();

    const response = await imageApi.uploadImage(file);

    if (response.success) {
      const imageData = response.data;
      const markdownText = `![${imageData.original_filename}](${imageData.url})`;

      // 替换占位符为实际的图片链接
      form.article_content = form.article_content.replace(placeholder, markdownText);
      updateContent();

      // 设置光标位置到插入内容之后
      if (textarea) {
        setTimeout(() => {
          const newPosition = cursorPosition + markdownText.length;
          textarea.setSelectionRange(newPosition, newPosition);
          textarea.focus();
        }, 0);
      }
    } else {
      // 上传失败，移除占位符
      form.article_content = form.article_content.replace(placeholder, '');
      updateContent();

      console.error('图片上传失败:', response.message);
    }
  } catch (error) {
    // 上传出错，移除占位符
    const placeholder = `![Uploading...](uploading)`;
    form.article_content = form.article_content.replace(placeholder, '');
    updateContent();
    console.error('图片上传错误:', error);
  } finally {
    isUploadingImage.value = false;
  }
};

const getTagClass = (tagId) => {
  if (form.article_tags.includes(tagId)) {
    // Selected tag
    return 'bg-blue-500 text-white shadow';
  } else if (isCurrentTag(tagId)) {
    // Current article tag (but not selected in form)
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-300 dark:border-purple-700';
  } else {
    // Regular available tag
    return 'bg-gray-100 dark:bg-gray-700/80 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
  }
};

const getTagHoverClass = (tagId) => {
  if (form.article_tags.includes(tagId)) {
    return 'hover:bg-blue-600';
  } else {
    return 'hover:bg-gray-200 dark:hover:bg-gray-600';
  }
};

const isCurrentTag = (tagId) => {
  return currentTags.value.some(tag => tag.tag_id === tagId);
};

// Validate form fields
const validateForm = () => {
  errors.article_title = '';
  errors.article_content = '';
  errors.article_source = '';

  if (!form.article_title.trim()) {
    errors.article_title = 'Title is required';
  } else if (form.article_title.length > 128) {
    errors.article_title = 'Title must be less than 128 characters';
  }

  if (!form.article_content.trim()) {
    errors.article_content = 'Content is required';
  }

  if (!form.article_source.trim()) {
    errors.article_source = 'Source is required';
  } else if (form.article_source.length > 128) {
    errors.article_source = 'Source must be less than 128 characters';
  }

  return isValid.value;
};

const isValidImageUrl = (url) => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  } catch {
    return false;
  }
};

const onImageError = (event) => {
  event.target.style.display = 'none';
};

const onImageLoad = (event) => {
  form.article_head_image_width = event.target.naturalWidth;
  form.article_head_image_height = event.target.naturalHeight;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
    await props.onSubmit({
      article_title: form.article_title.trim(),
      article_content: form.article_content.trim(),
      article_source: form.article_source.trim(),
      article_source_link: form.article_source_link?.trim() || "",
      article_author: form.article_author?.trim() || "",
      article_summary: form.article_summary?.trim() || "",
      article_head_image: form.article_head_image?.trim() || "",
      article_head_image_width: form.article_head_image_width,
      article_head_image_height: form.article_head_image_height,
      article_tags: form.article_tags,
      article_category: form.article_category,
      status: form.status
    });
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  form.article_title = '';
  form.article_content = '';
  form.article_source = '';
  form.article_source_link = '';
  form.article_author = '';
  form.article_summary = '';
  form.article_head_image = '';
  form.article_tags = [];
  form.article_category = 'article';
  form.status = 1;

  errors.article_title = '';
  errors.article_content = '';
  errors.article_source = '';

  emit('update:content', '');
};

const insertMarkdownSyntax = () => {
  const examples = [
    '# Heading 1',
    '## Heading 2',
    '**Bold text**',
    '*Italic text*',
    '- List item',
    '[Link text](https://example.com)',
    '```\ncode block\n```',
    '> Blockquote'
  ].join('\n\n');

  if (!form.article_content) {
    form.article_content = examples;
    updateContent();
  }
};

// Toggle tag selection
const toggleTagSelection = (tagId) => {
  const index = form.article_tags.indexOf(tagId);
  if (index > -1) {
    // Remove tag
    form.article_tags.splice(index, 1);
  } else {
    // Add tag
    form.article_tags.push(tagId);
  }
};

// Emit content changes
watch(() => form.article_content, updateContent);
</script>
