<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const isLoading = ref(true);
const commentText = ref('');

async function fetchPost() {
    try {
        const response = await axios.get(`/feed/${route.params.id}`);
        post.value = response.data.data;
        console.log(post.value.data);
    } catch (error) {
        console.error("Fetch error:", error);
    } finally {
        isLoading.value = false;
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
    <div class="min-h-screen bg-[#F3F4F6] text-[#1c1e21] pb-12 font-sans selection:bg-red-200">
        <!-- Sticky Header -->
        <header
            class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 h-16 flex items-center px-4 md:px-8 border-b border-gray-200">
            <a href="/feed"
                class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium mr-auto group">
                <div class="p-1.5 rounded-full group-hover:bg-gray-100 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                Back to Feed
            </a>
            <span class="text-lg font-bold text-gray-800 absolute left-1/2 -translate-x-1/2">
                Request Details
            </span>
        </header>

        <main class="max-w-2xl mx-auto pt-6 px-4 space-y-6">

            <!-- Loading Skeleton -->
            <div v-if="isLoading" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 animate-pulse">
                <div class="flex gap-3.5 items-center mb-6">
                    <div class="w-12 h-12 rounded-full bg-gray-200"></div>
                    <div class="space-y-2 flex-1">
                        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
                <div class="space-y-3 mb-6">
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div class="w-full h-64 bg-gray-200 rounded-xl mb-4"></div>
            </div>

            <!-- Error / Not Found State -->
            <div v-else-if="!post" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-1">Post Not Found</h3>
                <p class="text-gray-500">The request you are looking for doesn't exist or has been removed.</p>
            </div>

            <!-- Main Post Card -->
            <div v-else class="space-y-6">
                <article class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <!-- Post Header -->
                    <div class="p-5 flex items-start justify-between">
                        <div class="flex gap-3.5 items-center">
                            <img :src="post.user?.profile_photo_url || post.user?.profile_photo_path || 'https://ui-avatars.com/api/?name=' + (post.user?.email || 'User')"
                                class="w-12 h-12 rounded-full border-2 border-gray-100 object-cover" alt="Poster">
                            <div>
                                <h3 class="font-bold text-[16px] text-gray-900 leading-tight">
                                    {{ post.user?.firstname || 'Unknown' }} {{ post.user?.lastname || 'User' }}
                                </h3>
                                <div class="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500 mt-1">
                                    <span>{{ formatDate(post.created_at) }}</span>
                                    <span v-if="post.location">•</span>
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
                        <div class="flex flex-col items-end gap-2">
                            <!-- Blood Type Badge -->
                            <div class="px-3 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border"
                                :class="post.blood_type ? 'bg-red-50 text-red-700 border-red-100' : 'bg-gray-50 text-gray-500 border-gray-200'">
                                <span v-if="post.blood_type && post.status !== 'completed'"
                                    class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                {{ post.blood_type || 'Unknown Type' }}
                            </div>
                            <!-- Status Badge -->
                            <div v-if="post.status"
                                class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider" :class="{
                                    'bg-green-100 text-green-800': post.status === 'completed',
                                    'bg-blue-100 text-blue-800': post.status !== 'completed'
                                }">
                                {{ post.status }}
                            </div>
                        </div>
                    </div>

                    <!-- Target Date Alert -->
                    <div v-if="post.needed_by && post.status !== 'completed'"
                        class="px-5 py-2.5 bg-orange-50 border-y border-orange-100 flex items-center gap-2 text-sm font-medium text-orange-800">
                        <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Needed by: {{ formatShortDate(post.needed_by) }}
                    </div>

                    <!-- Post Description (Directly mapped to your data) -->
                    <div class="px-5 py-4 text-[16px] leading-relaxed whitespace-pre-wrap text-gray-800">
                        {{ post.description || 'No description provided for this request.' }}
                    </div>

                    <!-- Post Media -->
                    <div v-if="post.media_path" class="relative bg-gray-50 border-y border-gray-100 overflow-hidden">
                        <img :src="post.media_path" class="w-full h-auto max-h-[500px] object-contain bg-black/5"
                            alt="Request Media" :class="{ 'grayscale opacity-80': post.status === 'completed' }">
                    </div>

                    <!-- Post Stats -->
                    <div class="px-5 py-4 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
                        <div class="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <div class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                <svg class="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <!-- Assuming likes_count is returned, otherwise fallback to 0 -->
                            {{ post.likes_count || 0 }} supports
                        </div>
                        <div class="text-sm font-medium text-gray-500">
                            {{ post.comments?.length || 0 }} comments
                        </div>
                    </div>

                    <!-- Actions Bar -->
                    <div class="p-4 bg-white border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <!-- Primary Action (Disabled if completed) -->
                        <button :disabled="post.status === 'completed'"
                            class="w-full text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                            :class="post.status === 'completed' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-red-200 active:scale-95'">
                            <svg v-if="post.status !== 'completed'" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 115.5 5.5L12 21.5l-5.5-11.646a4 4 0 115.5-5.5z" />
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                            {{ post.status === 'completed' ? 'Request Completed' : 'Donate Blood' }}
                        </button>

                        <div class="flex gap-3">
                            <form action="#" method="POST" class="flex-1">
                                <!-- Support Action -->
                                <button type="submit"
                                    class="w-full bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                    Support
                                </button>
                            </form>
                            <button
                                class="px-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center">
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
                    <div class="p-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                        <h3 class="font-bold text-gray-900 flex items-center gap-2">
                            Comments
                            <span class="bg-gray-200 text-gray-700 py-0.5 px-2.5 rounded-full text-xs">{{
                                post.comments?.length || 0 }}</span>
                        </h3>
                    </div>

                    <div class="p-5">
                        <!-- Add Comment Form -->
                        <form action="#" method="POST" class="flex gap-3 mb-8">
                            <img :src="currentUser?.profile_photo_url || 'https://ui-avatars.com/api/?name=Me'"
                                class="w-10 h-10 rounded-full object-cover border border-gray-100 shrink-0" alt="You">
                            <div class="flex-1 relative">
                                <!-- Removed native 'required' to stop the ugly browser warning icon -->
                                <textarea name="content" v-model="commentText" rows="2"
                                    placeholder="Write a comment or offer help..."
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:bg-white transition-colors resize-none text-sm"></textarea>
                                <button type="submit"
                                    class="absolute right-2 bottom-3 p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                                    :disabled="!commentText.trim()">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <!-- Comments List -->
                        <div class="space-y-6">
                            <!-- Empty State -->
                            <div v-if="!post.comments || post.comments.length === 0"
                                class="text-center py-8 text-gray-500 text-sm">
                                No comments yet. Be the first to offer help or share support.
                            </div>

                            <!-- Render Comments -->
                            <div v-for="comment in post.comments" :key="comment.id" class="flex gap-3 group">
                                <img :src="comment.user?.profile_photo_url || 'https://ui-avatars.com/api/?name=' + (comment.user?.email || 'User')"
                                    class="w-10 h-10 rounded-full object-cover border border-gray-100 shrink-0 mt-1"
                                    alt="Commenter">

                                <div class="flex-1">
                                    <div class="bg-gray-50 rounded-2xl rounded-tl-none p-3.5 border border-gray-100">
                                        <div class="flex items-center justify-between mb-1">
                                            <h4 class="font-bold text-gray-900 text-sm">
                                                {{ comment.user?.firstname }} {{ comment.user?.lastname }}
                                            </h4>
                                            <span class="text-xs text-gray-400">{{ formatDate(comment.created_at)
                                                }}</span>
                                        </div>
                                        <p class="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{{
                                            comment.content }}</p>
                                    </div>

                                    <!-- Comment Actions -->
                                    <div class="flex items-center gap-4 mt-1.5 ml-2 text-xs font-medium text-gray-500">
                                        <button class="hover:text-red-600 transition-colors">Like</button>
                                        <button class="hover:text-gray-800 transition-colors">Reply</button>
                                        <button v-if="currentUser?.id === comment.user?.id"
                                            class="hover:text-red-600 transition-colors ml-auto opacity-0 group-hover:opacity-100">Delete</button>
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