<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const posts = ref([]);
const isLoading = ref(true);
const processingId = ref(null);

const currentUser = ref((() => {
  try {
    return JSON.parse(localStorage.getItem('user_data'));
  } catch {
    return null;
  }
})());

async function fetchMyPosts() {
  try {
    const response = await axios.get('/profile/posts');

    // Safely extract the array whether it's under posts, data, or the root object
    const payload = response.data;
    posts.value = Array.isArray(payload) ? payload : (payload.posts || payload.data || []);

    if (posts.value.length > 0 && posts.value[0].user) {
      currentUser.value = posts.value[0].user;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function deletePost(id) {
  if (!confirm('Are you sure you want to delete this request? This action cannot be undone.')) return;

  processingId.value = id;
  try {
    await axios.delete(`/feed/${id}`);
    posts.value = posts.value.filter(p => p.id !== id);
  } catch (error) {
    alert('Failed to delete post. Please try again.');
  } finally {
    processingId.value = null;
  }
}

onMounted(() => {
  fetchMyPosts();
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6] text-[#1c1e21] pb-12 font-sans selection:bg-red-100 selection:text-red-900">
    <header class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 h-16 flex items-center px-4 md:px-8 border-b border-gray-200">
      <a href="/feed" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium mr-auto group">
        <div class="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span class="hidden sm:inline">Back to Feed</span>
      </a>

      <span class="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
        My Requests
      </span>

      <div class="ml-auto">
        <a href="/create" class="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          New Request
        </a>
      </div>
    </header>

    <main class="max-w-2xl mx-auto pt-6 px-4 space-y-6">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-5">
        <img :src="currentUser?.profile_photo_url || 'https://ui-avatars.com/api/?name=' + (currentUser?.firstname || 'Me') + '&background=FEE2E2&color=991B1B'"
             class="w-16 h-16 rounded-full object-cover border-2 border-red-50" alt="Profile">
        <div>
          <h2 class="text-xl font-bold text-gray-900">{{ currentUser?.firstname || 'User' }} {{ currentUser?.lastname || '' }}</h2>
          <p class="text-gray-500 text-sm mt-0.5">Manage your blood donation requests</p>
        </div>
        <div class="ml-auto text-center hidden sm:block px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
          <span class="block text-2xl font-black text-gray-800">{{ posts.length }}</span>
          <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Requests</span>
        </div>
      </div>

      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
          <div class="flex justify-between items-start mb-4">
            <div class="space-y-2 flex-1">
              <div class="h-5 bg-gray-200 rounded-md w-1/4"></div>
              <div class="h-3 bg-gray-200 rounded-md w-1/3"></div>
            </div>
            <div class="w-16 h-6 bg-gray-200 rounded-md"></div>
          </div>
          <div class="space-y-2 mb-4">
            <div class="h-4 bg-gray-200 rounded-md w-full"></div>
            <div class="h-4 bg-gray-200 rounded-md w-5/6"></div>
          </div>
          <div class="h-10 bg-gray-100 rounded-xl w-full"></div>
        </div>
      </div>

      <div v-else-if="posts.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-100">
          <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No Requests Yet</h3>
        <p class="text-gray-500 max-w-sm mx-auto">You haven't posted any blood donation requests. Create one if you or someone you know needs help.</p>
        <a href="/create" class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all active:scale-[0.98] shadow-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Create New Request
        </a>
      </div>

      <div v-else class="space-y-6">
        <article v-for="post in posts" :key="post.id" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative" :class="{ 'opacity-75': processingId === post.id }">
          <div v-if="processingId === post.id" class="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
          </div>

          <div class="p-5 sm:p-6 flex items-start justify-between border-b border-gray-50">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <div class="px-2.5 py-1 rounded-md text-[12px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm border" :class="post.blood_type ? 'bg-red-50 text-red-700 border-red-100' : 'bg-gray-50 text-gray-500 border-gray-200'">
                  {{ post.blood_type || 'Unknown Type' }}
                </div>
                <div class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider" :class="{ 'bg-green-100 text-green-800 border border-green-200': post.status === 'completed', 'bg-blue-50 text-blue-700 border border-blue-100': post.status !== 'completed' }">
                  {{ post.status || 'Active' }}
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500">
                <span>Posted {{ formatDate(post.created_at) }}</span>
                <span v-if="post.location" class="text-gray-300">•</span>
                <span v-if="post.location" class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ post.location }}
                </span>
              </div>
            </div>
          </div>

          <div class="px-5 sm:px-6 py-4 text-[15px] leading-relaxed text-gray-800 line-clamp-3">
            {{ post.description || 'No description provided.' }}
          </div>

          <div class="p-4 sm:p-5 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4 text-sm text-gray-500 font-medium w-full sm:w-auto">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                {{ post.likes_count || 0 }} supports
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
                {{ post.comments?.length || 0 }} comments
              </span>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <a :href="`/post/${post.id}`" class="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[13px] font-bold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-center shadow-sm">
                View
              </a>
              <button @click="deletePost(post.id)" title="Delete Post" class="px-3 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg transition-colors shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>