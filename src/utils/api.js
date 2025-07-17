const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        window.location.href = '/admin/login';
        throw new Error('Authentication required');
      }
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Admin API functions
export const adminAPI = {
  // Login
  login: (credentials) => apiRequest('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  // Get profile
  getProfile: () => apiRequest('/admin/profile'),

  // Update profile
  updateProfile: (data) => apiRequest('/admin/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Get dashboard stats
  getDashboardStats: () => apiRequest('/admin/dashboard/stats'),

  // Get all admins
  getAllAdmins: () => apiRequest('/admin/all'),

  // Create admin
  createAdmin: (data) => apiRequest('/admin/create', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Update admin status
  updateAdminStatus: (id, status) => apiRequest(`/admin/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive: status })
  })
};

// Stories API functions
export const storiesAPI = {
  // Get all stories (public)
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/stories?${queryString}`);
  },

  // Get story by ID (public)
  getById: (id) => apiRequest(`/stories/${id}`),

  // Get featured stories (public)
  getFeatured: () => apiRequest('/stories/featured/list'),

  // Get story stats (public)
  getStats: () => apiRequest('/stories/stats/overview'),

  // Admin: Get all stories
  adminGetAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/stories/admin/all?${queryString}`);
  },

  // Admin: Create story
  adminCreate: (data) => apiRequest('/stories', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Admin: Update story
  adminUpdate: (id, data) => apiRequest(`/stories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  // Admin: Delete story
  adminDelete: (id) => apiRequest(`/stories/${id}`, {
    method: 'DELETE'
  }),

  // Like story
  like: (id) => apiRequest(`/stories/${id}/like`, {
    method: 'POST'
  }),

  // Share story
  share: (id) => apiRequest(`/stories/${id}/share`, {
    method: 'POST'
  })
};

// Comments API functions
export const commentsAPI = {
  // Submit comment (public)
  submit: (data) => apiRequest('/comments', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Get comments for story (public)
  getForStory: (storyId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/comments/story/${storyId}?${queryString}`);
  },

  // Get comment stats (public)
  getStats: (storyId) => apiRequest(`/comments/story/${storyId}/stats`),

  // Admin: Get all comments
  adminGetAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/comments?${queryString}`);
  },

  // Admin: Approve/reject comment
  adminUpdateStatus: (id, data) => apiRequest(`/comments/${id}/approve`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Admin: Delete comment
  adminDelete: (id) => apiRequest(`/comments/${id}`, {
    method: 'DELETE'
  }),

  // Like comment
  like: (id) => apiRequest(`/comments/${id}/like`, {
    method: 'POST'
  })
};

// Subscriptions API functions
export const subscriptionsAPI = {
  // Subscribe
  subscribe: (email) => apiRequest('/subscriptions/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
  }),

  // Unsubscribe
  unsubscribe: (email) => apiRequest('/subscriptions/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
  }),

  // Get status
  getStatus: (email) => apiRequest(`/subscriptions/status/${email}`),

  // Admin: Get all subscribers
  adminGetAll: () => apiRequest('/subscriptions/all'),

  // Admin: Get stats
  adminGetStats: () => apiRequest('/subscriptions/stats')
};

// Suggestions API functions
export const suggestionsAPI = {
  // Submit suggestion (public)
  submit: (data) => apiRequest('/suggestions', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  // Admin: Get all suggestions
  adminGetAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/suggestions?${queryString}`);
  },

  // Admin: Get suggestion by ID
  adminGetById: (id) => apiRequest(`/suggestions/${id}`),

  // Admin: Update status
  adminUpdateStatus: (id, data) => apiRequest(`/suggestions/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }),

  // Admin: Get stats
  adminGetStats: () => apiRequest('/suggestions/stats/overview')
};

export default apiRequest; 