import axios from 'axios';

// const API_BASE_URL = 'https://local.internal.zeit.fun/api';
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL, timeout: 10000, headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
apiClient.interceptors.response.use((response) => {
    console.log('API Response:', response.status, response.data);
    return response;
}, (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
});

export const articleApi = {
    async createArticle(data) {
        try {
            const response = await apiClient.post('/articles/create', data);
            return response.data;
        } catch (error) {
            throw {
                success: false,
                code: error.response?.status || 500,
                message: error.response?.data?.message || error.message || 'Failed to create article',
                timestamp: Date.now()
            };
        }
    },

    async queryListBySelective(params = {}) {
        try {
            const response = await apiClient.get('/articles/query_list_by_selective', {
                params: {
                    ...params, // Ensure proper parameter formatting
                    page: params.page || 1, per_page: params.per_page || 10
                }
            });
            return response.data;
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || error.message || 'Failed to query articles',
            };
        }
    },

    async getArticleList(page = 1, perPage = 10, filters = {}) {
        try {
            const params = {
                page, per_page: perPage, ...filters
            };

            const response = await apiClient.get('/articles/get_summary_list', {params});
            return response.data;
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || error.message || 'Failed to fetch articles',
            };
        }
    },

    async getArticleDetail(articleId) {
        try {
            const response = await apiClient.get('/articles/get_detail_by_article_id', {
                params: {article_id: articleId}
            });
            return response.data;
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || error.message || 'Failed to fetch article detail',
            };
        }
    },

    async updateArticle(articleId, data) {
        try {
            data.article_id = articleId;
            const response = await apiClient.post('/articles/update', data);
            return response.data;
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || error.message || 'Failed to update article',
            };
        }
    },

    async deleteArticle(articleId,) {
        try {
            const response = await apiClient.post('/articles/delete',
                {article_id: articleId}, {
                    params: {}
                });
            return response.data;
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || error.message || 'Failed to delete article',
            };
        }
    },
    async physicsDeleteArticle(articleId) {
        try {
            const response = await apiClient.post('/articles/delete', {
                article_id: articleId, soft_delete: false
            }, {
                params: {}
            });
            return response.data;
        } catch (error) {
            return {
                success: false, message: error.response?.data?.message || error.message || 'Failed to delete article',
            };
        }
    },
};

export const tagApi = {
    async createTag(data) {
        try {
            const response = await apiClient.post('/tags/create', data);
            return response.data;
        } catch (error) {
            throw {
                success: false,
                code: error.response?.status || 500,
                message: error.response?.data?.message || error.message || 'Failed to create tag',
                timestamp: Date.now()
            };
        }
    },

    async getTagById(tagId) {
        try {
            const response = await apiClient.get('/tags/get_by_id', {
                params: {tag_id: tagId}
            });
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to get tag',
            };
        }
    },

    async updateTag(data) {
        try {
            const response = await apiClient.post('/tags/update', data);
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update tag',
            };
        }
    },

    async deleteTag(tagId, softDelete = true) {
        try {
            const response = await apiClient.post('/tags/delete', {
                tag_id: tagId,
                soft_delete: softDelete
            });
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to delete tag',
            };
        }
    },

    async getTagList(page = 1, pageSize = 10, status = null) {
        try {
            const params = {
                page,
                page_size: pageSize
            };

            if (status !== null) {
                params.status = status;
            }

            const response = await apiClient.get('/tags/list', {params});
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch tags',
            };
        }
    },
};

export const hotArticleApi = {
    async getHotArticles(params = {}) {
        try {
            const response = await apiClient.get('/articles/hot', {params});
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch hot articles',
            };
        }
    },
};

export const imageApi = {
    async uploadImage(file, filename = null) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (filename) {
                formData.append('filename', filename);
            }

            const response = await axios.post(`${API_BASE_URL}/files/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, timeout: 30000,
            });

            return {
                success: true, data: response.data,
            };
        } catch (error) {
            return {
                success: false, message: error.response?.data?.detail || error.message || 'Failed to upload image',
            };
        }
    },

    async uploadImageFromFile(file, filename = null) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (filename) {
                formData.append('filename', filename);
            }

            const response = await axios.post(`${API_BASE_URL}/files/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, timeout: 30000,
            });

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || error.message || 'Failed to upload image',
            };
        }
    },
    async uploadImageFromBase64(imageData, filename = null) {
        try {
            const formData = new FormData();
            formData.append('image_data', imageData);
            if (filename) {
                formData.append('filename', filename);
            }

            const response = await axios.post(`${API_BASE_URL}/files/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, timeout: 30000,
            });

            return {
                success: true, data: response.data,
            };
        } catch (error) {
            return {
                success: false, message: error.response?.data?.detail || error.message || 'Failed to upload image',
            };
        }
    },

    async getImageList(page = 1, pageSize = 20) {
        try {
            const response = await apiClient.get('/files/images/list', {
                params: {
                    page, page_size: pageSize,
                },
            });

            return {
                success: true, data: response.data,
            };
        } catch (error) {
            return {
                success: false, message: error.response?.data?.detail || error.message || 'Failed to fetch image list',
            };
        }
    },

    async deleteImage(imageKey) {
        try {
            const response = await apiClient.post('/files/images/delete', null, {
                params: {
                    image_key: imageKey,
                },
            });

            return {
                success: true, data: response.data,
            };
        } catch (error) {
            return {
                success: false, message: error.response?.data?.detail || error.message || 'Failed to delete image',
            };
        }
    },
};