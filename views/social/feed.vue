<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// State Management
const user = ref(null);
const posts = ref([]);
const isLoading = ref(true);
const filterActive = ref(true); // Added: Needed for your toggle button

// Constants
const DEFAULT_POST_IMAGE = "https://images.unsplash.com/photo-1536856789559-1ce55874cf33?auto=format&fit=crop&q=80&w=1000";

async function fetchPosts() {
    try {
        const response = await axios.get('/feed');
        posts.value = response.data;
    } catch (error) {
        console.error("Fetch error:", error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
        try {
            user.value = JSON.parse(savedUser);
        } catch (e) {
            console.error("User data parse error", e);
        }
    }
    fetchPosts();
});

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};
</script>

<template>
    <div class="min-h-screen bg-[#F3F4F6] text-[#1c1e21] pb-12 font-sans">
        <header
            class="bg-white shadow-sm sticky top-0 z-50 h-16 flex items-center px-4 md:px-8 justify-between border-b border-gray-200">
            <div class="flex items-center gap-2">
                <div class="bg-red-600 p-2 rounded-full shadow-lg">
                    <svg class="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
                        <path
                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </div>
                <span class="text-xl font-extrabold tracking-tight hidden sm:block">Life<span
                        class="text-red-600">Link</span></span>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                    <span class="text-xs font-bold text-gray-500 uppercase">Compatible Only</span>
                    <button @click="filterActive = !filterActive"
                        :class="['w-9 h-5 flex items-center rounded-full px-1 transition-colors', filterActive ? 'bg-red-600' : 'bg-gray-300']">
                        <div
                            :class="['w-3 h-3 bg-white rounded-full transition-transform', filterActive ? 'translate-x-4' : 'translate-x-0']">
                        </div>
                    </button>
                </div>

                <button
                    class="flex items-center gap-2 p-1 pr-3 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200">
                    <img :src="user?.profile_photo_url" class="w-8 h-8 rounded-full border border-gray-200" alt="Me">
                    <span class="text-sm font-bold hidden md:block">{{ user?.firstname }}</span>
                </button>
            </div>
        </header>

        <main class="max-w-[640px] mx-auto pt-6 px-4">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                <div class="flex gap-4">
                    <img :src="user?.profile_photo_url" class="w-11 h-11 rounded-full" alt="Me">
                    <button
                        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 text-left px-5 py-2.5 rounded-2xl text-[15px] font-medium">
                        Need blood for someone? Post a request...
                    </button>
                </div>
            </div>

            <div v-if="!isLoading" class="space-y-6">
                <article v-for="post in posts" :key="post.id"
                    class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 flex items-center justify-between">
                        <div class="flex gap-3 items-center">
                            <img :src="post.user.profile_photo_url"
                                class="w-12 h-12 rounded-full border border-gray-100" alt="Poster">
                            <div>
                                <h3 class="font-bold text-[16px] leading-tight">{{ post.user.firstname }} {{
                                    post.user.lastname }}</h3>
                                <div class="flex items-center gap-2 text-[13px] text-gray-500 mt-0.5">
                                    <span>{{ formatDate(post.created_at) }}</span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">{{ post.location }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div
                                class="bg-red-600 text-white px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest">
                                {{ post.blood_type }} Need
                            </div>
                        </div>
                    </div>

                    <div class="px-4 pb-4 text-[15px] leading-relaxed text-gray-800">{{ post.description }}</div>

                    <div class="relative bg-gray-100 border-y border-gray-100">
                        <img :src="post.media_path || DEFAULT_POST_IMAGE"
                            class="w-full h-auto max-h-[500px] object-cover"
                            :class="{ 'opacity-80 grayscale-[20%]': !post.media_path }">
                        <div v-if="!post.media_path" class="absolute inset-0 flex items-center justify-center">
                            <div
                                class="bg-white/90 px-4 py-2 rounded-full shadow-sm text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Community Need
                            </div>
                        </div>
                    </div>

                    <div class="px-4 py-3 flex items-center justify-between border-b border-gray-50">
                        <div class="flex items-center gap-1.5 text-sm text-gray-500">
                            <span class="font-medium">{{ post.likes }} supports</span>
                        </div>
                        <div class="text-sm font-medium text-gray-400">{{ post.comments_count }} comments</div>
                    </div>

                    <div class="p-4 bg-gray-50/50 flex gap-3">
                        <button
                            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95">
                            Help (Donate)
                        </button>
                        <button
                            class="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-all shadow-sm active:scale-95">
                            Support Money
                        </button>
                    </div>
                </article>

                <div v-if="posts.length === 0" class="py-20 text-center">
                    <h3 class="font-bold text-lg text-gray-400">No matching requests found</h3>
                </div>
            </div>

            <div v-else class="py-20 text-center text-gray-400 font-bold animate-pulse">
                Fetching latest requests...
            </div>
        </main>
    </div>
</template>