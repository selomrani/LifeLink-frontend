<template>
  <div class="min-h-screen pb-12 bg-[#F3F4F6] text-[#1c1e21] antialiased">
    <header class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 h-16 flex items-center px-4 md:px-8 border-b border-gray-200 gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="text-lg font-bold text-gray-800">Profile</span>
    </header>

    <main class="max-w-[640px] mx-auto pt-6 px-4 space-y-6">
      <div v-if="isLoading" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div class="flex flex-col items-center gap-4">
          <div class="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div class="h-6 bg-gray-200 rounded w-1/3"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      <div v-else-if="profileUser" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-500 to-red-700 opacity-10"></div>

        <div class="relative flex flex-col items-center">
          <img :src="profileUser.profile_photo_url || '/default-avatar.png'"
               class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
               alt="User Avatar">

          <h2 class="text-2xl font-bold text-gray-900 mt-3">
            {{ profileUser.firstname }} {{ profileUser.lastname }}
          </h2>

          <div v-if="profileUser.blood_type" class="mt-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-black tracking-widest shadow-sm border border-red-200">
            {{ profileUser.blood_type }}
          </div>

          <button @click="isReportModalOpen = true"
                  v-if="currentUser?.id !== profileUser.id"
                  class="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-colors border border-gray-200 shadow-sm text-sm font-semibold group">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            Report User
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-bold text-lg text-gray-800 px-1">Requests by {{ profileUser?.firstname }}</h3>

        <div v-if="!isLoading && posts.length === 0" class="py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300">
          <p class="text-gray-500 font-medium">No requests posted yet.</p>
        </div>

        <article v-for="post in posts" :key="post.id"
                 @click="$router.push(`/post/${post.id}`)"
                 class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-red-200 transition-all duration-200 group">
          <div class="flex justify-between items-start mb-3">
            <div class="flex gap-1.5 text-[13px] text-gray-500 font-medium">
              <span>{{ formatDate(post.created_at) }}</span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ post.location }}
              </span>
            </div>
            <div class="bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-widest">
              {{ post.blood_type }}
            </div>
          </div>

          <p class="text-[15px] leading-relaxed text-gray-800 whitespace-pre-wrap line-clamp-3">{{ post.description }}</p>

          <div class="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500">
            <span class="flex items-center gap-1">
                <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                {{ post.donations_count || 0 }} offers
            </span>
            <span class="font-semibold text-red-600 group-hover:text-red-700 group-hover:underline flex items-center gap-1 transition-colors">
                View Request
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </span>
          </div>
        </article>
      </div>
    </main>

    <transition name="fade">
      <div v-if="isReportModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeReportModal"></div>
        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Report User
            </h2>
            <button @click="closeReportModal" class="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-4">
            <p class="text-sm text-gray-500 mb-4">If this user is violating community guidelines, let us know. This will be reviewed by an admin.</p>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Reason</label>
              <select v-model="reportForm.reason" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-red-200 outline-none">
                <option value="" disabled>Select a reason...</option>
                <option value="Fake Account">Fake Account</option>
                <option value="Spam / Scammer">Spam / Scammer</option>
                <option value="Inappropriate Content">Inappropriate Content</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex justify-between">
                <span>Description</span>
                <span :class="reportForm.description.length < 20 ? 'text-red-400' : 'text-green-500'">
                  {{ reportForm.description.length }}/20 min
                </span>
              </label>
              <textarea v-model="reportForm.description" rows="4"
                        class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-red-200 outline-none resize-none"
                        placeholder="Please provide details (minimum 20 characters)..."></textarea>
            </div>

            <p v-if="reportError" class="text-sm text-red-500 font-medium">{{ reportError }}</p>
          </div>

          <div class="p-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button @click="closeReportModal" class="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button @click="submitReport" :disabled="!isReportValid || isSubmittingReport"
                    class="px-5 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
              <span v-if="isSubmittingReport" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm transition-all duration-300"
         :class="toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const targetUserId = route.params.id;

const currentUser = ref(null);
const profileUser = ref(null);
const posts = ref([]);
const isLoading = ref(true);

const isReportModalOpen = ref(false);
const isSubmittingReport = ref(false);
const reportError = ref('');
const toastMessage = ref('');
let toastTimeout = null;

const reportForm = ref({
  reason: '',
  description: ''
});

const isReportValid = computed(() => {
  return reportForm.value.reason !== '' && reportForm.value.description.length >= 20;
});

onMounted(() => {
  const savedUser = localStorage.getItem('user_data');
  if (savedUser) {
    try { currentUser.value = JSON.parse(savedUser); } catch (e) {}
  }
  fetchProfileData();
});

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const dt = new Date(dateStr);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const showToast = (message) => {
  toastMessage.value = message;
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toastMessage.value = ''; }, 3000);
};

const closeReportModal = () => {
  isReportModalOpen.value = false;
  reportError.value = '';
  reportForm.value = { reason: '', description: '' };
};

async function fetchProfileData() {
  isLoading.value = true;
  try {
    const { data } = await axios.get(`/users/${targetUserId}`);
    profileUser.value = data.user;
    posts.value = data.user.blood_request_posts || [];
  } catch (error) {
    showToast('User not found.');
  } finally {
    isLoading.value = false;
  }
}

async function submitReport() {
  if (!isReportValid.value) return;

  isSubmittingReport.value = true;
  reportError.value = '';

  try {
    const { data } = await axios.post(`/users/${targetUserId}/report`, reportForm.value);

    showToast(data.message || 'Report submitted successfully.');
    closeReportModal();
  } catch (error) {
    if (error.response?.status === 422) {
      reportError.value = error.response.data.message || 'Please check your input. Description must be at least 20 characters.';
    } else {
      reportError.value = 'Failed to submit report. Please try again.';
    }
  } finally {
    isSubmittingReport.value = false;
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
/* Ensures the line-clamp works properly */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>