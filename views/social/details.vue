<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const isLoading = ref(true);
const commentText = ref('');
const isSubmitting = ref(false);

const currentUser = (() => {
    try {
        return JSON.parse(localStorage.getItem('user_data'));
    } catch {
        return null;
    }
})();

async function fetchPost() {
    try {
        const response = await axios.get(`/feed/${route.params.id}`);
        post.value = response.data.data;
    } catch (error) {
        console.error("Fetch error:", error);
    } finally {
        isLoading.value = false;
    }
}

async function addComment() {
    if (!commentText.value.trim() || isSubmitting.value) return;

    isSubmitting.value = true;
    try {
        const response = await axios.post(`/feed/${route.params.id}/comment`, {
            comment: commentText.value.trim()
        });

        commentText.value = '';
        if (post.value && post.value.comments) {
            post.value.comments.unshift(response.data.data);
        }
        console.log(response);
    } catch (error) {
        console.error("Laravel Error:", error.response?.data);
    } finally {
        isSubmitting.value = false;
    }
}
onMounted(() => {
    fetchPost();
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const formatShortDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<template>
    <div class="min-h-screen bg-[#F3F4F6] text-[#1c1e21] pb-12 font-sans selection:bg-red-100 selection:text-red-900">
        <!-- Sticky Header -->
        <header
            class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 h-16 flex items-center px-4 md:px-8 border-b border-gray-200">
            <a href="/feed"
                class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium mr-auto group">
                <div class="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <span class="hidden sm:inline">Back to Feed</span>
            </a>
            <span class="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
                Request Details
            </span>
        </header>

        <main class="max-w-2xl mx-auto pt-6 px-4 space-y-6">

            <!-- Loading Skeleton -->
            <div v-if="isLoading" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div class="flex gap-4 items-center mb-6">
                    <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                    <div class="space-y-2 flex-1">
                        <div class="h-4 bg-gray-200 rounded-md w-1/3"></div>
                        <div class="h-3 bg-gray-200 rounded-md w-1/4"></div>
                    </div>
                </div>
                <div class="space-y-3 mb-6">
                    <div class="h-4 bg-gray-200 rounded-md w-full"></div>
                    <div class="h-4 bg-gray-200 rounded-md w-5/6"></div>
                    <div class="h-4 bg-gray-200 rounded-md w-4/6"></div>
                </div>
                <div class="w-full h-64 bg-gray-100 rounded-xl mb-4"></div>
            </div>

            <!-- Error / Not Found State -->
            <div v-else-if="!post" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div
                    class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-gray-100">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Post Not Found</h3>
                <p class="text-gray-500">The request you are looking for doesn't exist or has been removed.</p>
                <a href="/feed"
                    class="mt-6 inline-block px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors">
                    Return to Feed
                </a>
            </div>

            <!-- Main Post Card -->
            <div v-else class="space-y-6">
                <article class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <!-- Post Header -->
                    <div class="p-5 sm:p-6 flex items-start justify-between">
                        <div class="flex gap-4 items-center">
                            <img :src="post.user?.profile_photo_url || post.user?.profile_photo_path || 'https://ui-avatars.com/api/?name=' + (post.user?.email || 'User') + '&background=F3F4F6&color=1F2937'"
                                class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gray-200 object-cover shadow-sm"
                                alt="Poster">
                            <div>
                                <h3 class="font-bold text-[17px] text-gray-900 leading-tight">
                                    {{ post.user?.firstname || 'Unknown' }} {{ post.user?.lastname || 'User' }}
                                </h3>
                                <div class="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500 mt-1">
                                    <span>{{ formatDate(post.created_at) }}</span>
                                    <span v-if="post.location" class="text-gray-300">•</span>
                                    <span v-if="post.location" class="flex items-center gap-1">
                                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {{ post.location }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Badges -->
                        <div class="flex flex-col items-end gap-2 shrink-0">
                            <div class="px-3 py-1.5 rounded-lg text-[13px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm border"
                                :class="post.blood_type ? 'bg-red-50 text-red-700 border-red-100' : 'bg-gray-50 text-gray-500 border-gray-200'">
                                <span v-if="post.blood_type && post.status !== 'completed'"
                                    class="w-2 h-2 rounded-full bg-red-600 animate-pulse relative">
                                    <span
                                        class="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75"></span>
                                </span>
                                {{ post.blood_type || 'Unknown Type' }}
                            </div>
                            <div v-if="post.status"
                                class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider" :class="{
                                    'bg-green-100 text-green-800': post.status === 'completed',
                                    'bg-blue-50 text-blue-700 border border-blue-100': post.status !== 'completed'
                                }">
                                {{ post.status }}
                            </div>
                        </div>
                    </div>

                    <!-- Target Date Alert -->
                    <div v-if="post.needed_by && post.status !== 'completed'"
                        class="px-5 sm:px-6 py-3 bg-amber-50 border-y border-amber-100 flex items-center gap-2.5 text-sm font-medium text-amber-800">
                        <svg class="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Needed by: <strong>{{ formatShortDate(post.needed_by) }}</strong></span>
                    </div>

                    <!-- Post Description -->
                    <div class="px-5 sm:px-6 py-5 text-[16px] leading-relaxed whitespace-pre-wrap text-gray-800">
                        {{ post.description || 'No description provided for this request.' }}
                    </div>

                    <!-- Post Media -->
                    <div v-if="post.media_path"
                        class="relative bg-black/5 border-y border-gray-100 overflow-hidden flex justify-center">
                        <img :src="post.media_path" class="w-full h-auto max-h-[500px] object-contain"
                            alt="Request Media" :class="{ 'grayscale opacity-80': post.status === 'completed' }">
                    </div>

                    <!-- Post Stats -->
                    <div
                        class="px-5 sm:px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
                        <div class="flex items-center gap-2 text-sm text-gray-600 font-medium">
                            <div class="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                                <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <span>{{ post.likes_count || 0 }} supports</span>
                        </div>
                        <div class="text-sm font-medium text-gray-500">
                            {{ post.comments?.length || 0 }} comments
                        </div>
                    </div>

                    <!-- Actions Bar -->
                    <div
                        class="p-4 sm:p-5 bg-white border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button :disabled="post.status === 'completed'"
                            class="w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-[15px]"
                            :class="post.status === 'completed' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-md hover:shadow-red-200 active:scale-[0.98]'">
                            <svg v-if="post.status !== 'completed'" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M12 4.354a4 4 0 115.5 5.5L12 21.5l-5.5-11.646a4 4 0 115.5-5.5z" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            {{ post.status === 'completed' ? 'Request Completed' : 'Donate Blood' }}
                        </button>

                        <div class="flex gap-3">
                            <button type="button"
                                class="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-[15px]">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                Support
                            </button>
                            <button type="button" title="Share"
                                class="px-5 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>

                <!-- Comments Section -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-5 sm:px-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h3 class="font-bold text-gray-900 flex items-center gap-2.5 text-lg">
                            Comments
                            <span class="bg-gray-200 text-gray-700 py-0.5 px-2.5 rounded-full text-xs font-bold">{{
                                post.comments?.length || 0 }}</span>
                        </h3>
                    </div>

                    <div class="p-5 sm:p-6">
                        <!-- Add Comment Form (Refined) -->
                        <div class="mb-10">
                            <div
                                class="flex items-start gap-3 bg-white border-2 border-gray-100 rounded-2xl p-2 focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50 transition-all duration-200 shadow-sm">
                                <img :src="currentUser?.profile_photo_url || 'https://ui-avatars.com/api/?name=' + (currentUser?.firstname || 'Me') + '&background=FEE2E2&color=991B1B'"
                                    class="w-10 h-10 rounded-full object-cover shrink-0 mt-1 ml-1 border border-gray-100"
                                    alt="You">

                                <div class="flex-1 flex flex-col sm:flex-row gap-2">
                                    <textarea v-model="commentText" rows="2"
                                        placeholder="Write a comment or offer help..."
                                        @keydown.enter.ctrl.prevent="addComment"
                                        class="w-full bg-transparent border-none p-3 text-gray-800 focus:outline-none focus:ring-0 resize-none text-[15px] min-h-[60px]"></textarea>

                                    <!-- Bigger, Clearer Send Button -->
                                    <div class="flex justify-end p-2 sm:p-0 sm:items-end">
                                        <button type="button" @click="addComment"
                                            :disabled="!commentText.trim() || isSubmitting"
                                            class="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 active:scale-[0.97] shadow-sm">
                                            <span v-if="!isSubmitting">Send</span>
                                            <span v-else>Sending</span>

                                            <!-- Spinner when submitting -->
                                            <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" fill="none"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                                            </svg>
                                            <!-- Send Icon -->
                                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p class="text-[11px] text-gray-400 mt-2 ml-2">Press <kbd
                                    class="font-mono bg-gray-100 px-1 rounded">Ctrl</kbd> + <kbd
                                    class="font-mono bg-gray-100 px-1 rounded">Enter</kbd> to send</p>
                        </div>

                        <!-- Comments List -->
                        <div class="space-y-6">
                            <div v-if="!post.comments || post.comments.length === 0"
                                class="text-center py-12 px-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50">
                                <div
                                    class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-3 border border-gray-100">
                                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h4 class="text-gray-900 font-medium mb-1">No comments yet</h4>
                                <p class="text-gray-500 text-sm">Be the first to offer help or share support.</p>
                            </div>

                            <div v-for="comment in post.comments" :key="comment.id" class="flex gap-3 group">
                                <img :src="comment.user?.profile_photo_url || 'https://ui-avatars.com/api/?name=' + (comment.user?.email || 'User') + '&background=F3F4F6'"
                                    class="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0 mt-1 shadow-sm"
                                    alt="Commenter">

                                <div class="flex-1 min-w-0">
                                    <div class="bg-gray-50 rounded-2xl rounded-tl-none p-4 border border-gray-100">
                                        <div class="flex items-center justify-between mb-1.5 gap-2">
                                            <h4 class="font-bold text-gray-900 text-[14px] truncate">
                                                {{ comment.user?.firstname }} {{ comment.user?.lastname }}
                                            </h4>
                                            <span class="text-[12px] text-gray-400 whitespace-nowrap">{{
                                                formatDate(comment.created_at) }}</span>
                                        </div>
                                        <p
                                            class="text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                                            {{ comment.comment }} </p>
                                    </div>

                                    <div
                                        class="flex items-center gap-4 mt-2 ml-2 text-[13px] font-medium text-gray-500">
                                        <button type="button" class="hover:text-red-600 transition-colors">Like</button>
                                        <button type="button"
                                            class="hover:text-gray-800 transition-colors">Reply</button>
                                        <button v-if="currentUser?.id === comment.user?.id" type="button"
                                            class="hover:text-red-600 transition-colors ml-auto sm:opacity-0 sm:group-hover:opacity-100">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>