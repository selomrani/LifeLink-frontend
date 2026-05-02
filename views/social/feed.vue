<template>
    <div class="min-h-screen pb-12 bg-[#F3F4F6] text-[#1c1e21] antialiased selection:bg-red-200">

        <header
            class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 h-16 flex items-center px-4 md:px-8 justify-between border-b border-gray-200">
            <div class="flex items-center gap-3 cursor-pointer">
                <div class="bg-gradient-to-br from-red-500 to-red-700 p-2 rounded-full shadow-md">
                    <svg class="w-5 h-5 text-white fill-white" viewBox="0 0 24 24">
                        <path
                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </div>
                <span class="text-xl font-extrabold tracking-tight hidden sm:block text-gray-800">
                    Life<span class="text-red-600">Link</span>
                </span>
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full shadow-sm cursor-pointer"
                    @click="filterActive = filterActive === 1 ? 0 : 1">
                    <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Compatible</span>
                    <button :class="['w-10 h-5 flex items-center rounded-full px-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-200',
                        filterActive === 1 ? 'bg-red-500' : 'bg-gray-300']">
                        <div :class="['w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300',
                            filterActive === 1 ? 'translate-x-4' : 'translate-x-0']">
                        </div>
                    </button>
                </div>

                <button @click="isProfileOpen = true"
                    class="flex items-center gap-2 p-1 pr-3 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200">
                    <img :src="user?.profile_photo_url"
                        class="w-8 h-8 rounded-full object-cover border border-white shadow-sm" alt="Me">
                    <span class="text-sm font-bold text-gray-700 hidden md:block">{{ user?.firstname }}</span>
                </button>
            </div>
        </header>

        <main class="max-w-[640px] mx-auto pt-6 px-4">

            <div
                class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6 hover:shadow-md transition-shadow">
                <div class="flex gap-4 items-center">
                    <img :src="user?.profile_photo_url" class="w-12 h-12 rounded-full object-cover" alt="Me">
                    <button @click="isCreatePostOpen = true"
                        class="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 text-left px-5 py-3 rounded-full text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-red-100 shadow-inner">
                        Need blood for someone? Request here...
                    </button>
                </div>
            </div>

            <div v-if="isLoading" class="space-y-6">
                <div v-for="i in 2" :key="i"
                    class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 animate-pulse">
                    <div class="flex gap-3 items-center mb-4">
                        <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div class="flex-1 space-y-2">
                            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div class="w-16 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div class="space-y-2 mb-4">
                        <div class="h-4 bg-gray-200 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div class="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div class="flex gap-3">
                        <div class="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                        <div class="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>

            <div v-else class="space-y-6">
                <article v-for="post in posts" :key="post.id"
                    class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">

                    <div class="p-4 flex items-start justify-between">
                        <div class="flex gap-3 items-center">
                            <img :src="post.user?.profile_photo_url"
                                class="w-12 h-12 rounded-full border-2 border-gray-50 shadow-sm object-cover"
                                alt="Poster">
                            <div>
                                <h3
                                    class="font-bold text-[16px] text-gray-900 leading-tight hover:underline cursor-pointer">
                                    {{ post.user?.firstname }} {{ post.user?.lastname }}
                                </h3>
                                <div class="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-500 mt-1">
                                    <span>{{ formatDate(post.created_at) }}</span>
                                    <span>•</span>
                                    <span class="flex items-center gap-1">
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

                        <div class="flex flex-col items-end gap-1.5">
                            <div
                                class="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-lg text-[13px] font-black uppercase tracking-widest shadow-sm">
                                {{ post.blood_type }}
                            </div>
                            <span v-if="post.needed_by" class="text-[11px] text-gray-400 font-medium">
                                Needed by {{ formatDate(post.needed_by) }}
                            </span>
                        </div>
                    </div>

                    <div class="px-4 pb-3 text-[15px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                        {{ post.description }}
                    </div>

                    <div class="relative overflow-hidden mx-4 rounded-xl mb-3">
                        <img v-if="post.media_path" :src="post.media_path"
                            class="w-full h-auto max-h-[400px] object-cover transition-transform duration-700 hover:scale-105 rounded-xl">
                        <div v-else
                            class="w-full h-40 bg-gray-50 border border-gray-100 flex items-center justify-center rounded-xl">
                            <span class="text-xs text-gray-400 font-medium">No image attached</span>
                        </div>
                    </div>

                    <div class="px-4 py-2 flex items-center justify-between border-b border-gray-50">
                        <div class="flex items-center gap-1.5 text-sm text-gray-500">
                            <div class="flex -space-x-1">
                                <div
                                    class="w-5 h-5 rounded-full bg-red-100 border border-white flex items-center justify-center z-10">
                                    <svg class="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <span class="font-medium hover:underline cursor-pointer">{{ post.donations_count || 0 }}
                                supports</span>
                        </div>
                        <div class="flex items-center gap-4 text-sm font-medium text-gray-500">
                            <span @click="$router.push(`/post/${post.id}`)" class="hover:underline cursor-pointer">
                                {{ post.comments_count || 0 }} comments
                            </span>
                            <span class="hover:underline cursor-pointer flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
                                    </path>
                                </svg>
                                Share
                            </span>
                        </div>
                    </div>

                    <div class="p-3 bg-gray-50/50 flex gap-3 rounded-b-2xl">
                        <button @click="showToast('Thank you for offering to donate blood!')"
                            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-all shadow-sm shadow-red-200 active:scale-[0.98] flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                <path
                                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            Donate Blood
                        </button>

                        <button @click="openSupportModal(post)"
                            class="flex-1 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm">
                            <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            Support Cost
                        </button>
                    </div>
                </article>

                <div v-if="posts.length === 0"
                    class="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 ring-8 ring-gray-50/50">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">No requests found</h3>
                    <p class="text-gray-500 text-sm max-w-xs mx-auto mb-4">
                        <span v-if="filterActive === 1">No active requests compatible with your blood type ({{
                            user?.blood_type }}).</span>
                        <span v-else>No active blood requests at the moment.</span>
                    </p>
                    <button v-if="filterActive === 1" @click="filterActive = 0"
                        class="text-red-600 font-bold hover:underline text-sm bg-red-50 px-4 py-2 rounded-lg">
                        View all requests
                    </button>
                </div>
            </div>
        </main>

        <transition name="fade">
            <div v-if="isProfileOpen" class="fixed inset-0 z-[100] flex justify-end">
                <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="isProfileOpen = false"></div>
                <div class="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
                    <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h2 class="text-xl font-bold text-gray-800">Your Profile</h2>
                        <button @click="isProfileOpen = false"
                            class="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 bg-white shadow-sm border border-gray-100">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="p-6 flex flex-col items-center border-b border-gray-100">
                        <div class="relative mb-4">
                            <img :src="user?.profile_photo_url"
                                class="w-24 h-24 rounded-full object-cover border-4 border-red-50 shadow-md" alt="Me">
                            <div
                                class="absolute bottom-0 right-0 bg-red-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">{{ user?.firstname }} {{ user?.lastname }}</h3>
                        <div
                            class="mt-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-black tracking-widest shadow-sm border border-red-200">
                            {{ user?.blood_type }}
                        </div>

                        <button @click="$router.push('/myposts'); isProfileOpen = false;"
                            class="mt-6 w-full py-2.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl text-center transition-colors text-sm shadow-md flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            View My Posts
                        </button>
                    </div>

                    <div class="p-6 flex-1 overflow-y-auto">
                        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Your Impact</h4>
                        <div class="grid grid-cols-2 gap-4 mb-8">
                            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
                                <div class="text-3xl font-black text-gray-800">{{ user?.donations_count ?? 0 }}</div>
                                <div class="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wide">Donations
                                </div>
                            </div>
                            <div class="bg-red-50 p-4 rounded-2xl border border-red-100 text-center shadow-sm">
                                <div class="text-3xl font-black text-red-600">{{ user?.lives_saved ?? 0 }}</div>
                                <div class="text-xs font-bold text-red-500 mt-1 uppercase tracking-wide">Lives Saved
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <button
                                class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span class="font-medium text-gray-700 group-hover:text-gray-900">Donation
                                        History</span>
                                </div>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button @click="$router.push('/profile/edit'); isProfileOpen = false;"
                                class="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-gray-200 transition-colors">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span class="font-medium text-gray-700 group-hover:text-gray-900">Edit
                                        Profile</span>
                                </div>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="p-6 border-t border-gray-100 bg-gray-50">
                        <button @click="logout" :disabled="isLoggingOut"
                            class="w-full py-3 text-red-600 font-bold hover:bg-red-100 bg-red-50 rounded-xl transition-colors border border-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <svg v-if="isLoggingOut" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {{ isLoggingOut ? 'Logging Out...' : 'Log Out' }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="isCreatePostOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="isCreatePostOpen = false"></div>
                <div
                    class="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full">
                    <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
                        <h2 class="text-lg font-bold text-gray-900">Create Blood Request</h2>
                        <button @click="isCreatePostOpen = false"
                            class="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 bg-white shadow-sm">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="p-6 space-y-5 overflow-y-auto">
                        <div class="flex items-center gap-3 mb-2">
                            <img :src="user?.profile_photo_url" class="w-10 h-10 rounded-full object-cover shadow-sm"
                                alt="Me">
                            <div>
                                <div class="font-bold text-gray-900 text-sm">{{ user?.firstname }}</div>
                                <div class="text-xs font-medium text-gray-500">Posting to community</div>
                            </div>
                        </div>

                        <textarea v-model="newPost.description"
                            class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 focus:bg-white resize-none transition-colors"
                            rows="4"
                            placeholder="Describe the urgency, patient details, and why you need help..."></textarea>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Blood
                                    Type Required</label>
                                <select v-model="newPost.blood_type"
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 font-bold focus:bg-white transition-colors appearance-none">
                                    <option disabled value="">Select type...</option>
                                    <option v-for="bt in bloodTypes" :key="bt.id" :value="bt.id">
                                        {{ bt.blood_type || bt.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Location</label>
                                <input type="text" v-model="newPost.location"
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 font-medium focus:bg-white transition-colors"
                                    placeholder="Hospital / City">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Needed
                                By</label>
                            <input type="date" v-model="newPost.needed_by"
                                class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 focus:bg-white transition-colors">
                            <p class="text-xs text-gray-400 mt-1">Leave blank if immediately needed</p>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Attach
                                Image (Optional)</label>
                            <div v-if="newPost.mediaPreview"
                                class="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                <img :src="newPost.mediaPreview" class="w-full h-full object-cover"
                                    alt="Upload preview">
                                <div
                                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button @click="removeImage"
                                        class="bg-white/90 hover:bg-white text-red-600 p-2 rounded-full shadow-lg active:scale-95">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div v-else class="flex items-center justify-center w-full">
                                <label
                                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p class="mb-1 text-sm text-gray-500"><span class="font-bold">Click to
                                                upload</span> or drag and drop</p>
                                        <p class="text-[10px] text-gray-400 font-medium">PNG, JPG or WEBP (Max 5MB)</p>
                                    </div>
                                    <input type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="p-5 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                        <button @click="isCreatePostOpen = false"
                            class="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                        <button @click="submitPost" :disabled="!isPostValid"
                            :class="['px-6 py-2.5 rounded-xl font-bold text-white transition-all shadow-sm',
                                isPostValid ? 'bg-red-600 hover:bg-red-700 active:scale-95' : 'bg-red-300 cursor-not-allowed']">
                            Post Request
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="isSupportModalOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeSupportModal"></div>
                <div class="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">Support this request</h2>
                    <p class="text-sm text-gray-500 mb-6">Help cover costs like transport or medication for this
                        patient.</p>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-400 uppercase mb-2">Amount (USD)</label>
                            <input type="number" v-model="donationAmount"
                                class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xl font-bold focus:ring-2 focus:ring-red-400 outline-none"
                                placeholder="10.00">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-400 uppercase mb-2">Card details</label>
                            <div class="p-3 border border-gray-200 rounded-xl bg-gray-50">
                                <div id="card-element"></div>
                            </div>
                        </div>
                    </div>

                    <button @click="processSupport" :disabled="isProcessing"
                        class="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        <span v-if="isProcessing"
                            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        {{ isProcessing ? 'Processing...' : 'Pay Now' }}
                    </button>
                </div>
            </div>
        </transition>

        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm transition-all duration-300 flex items-center gap-3"
            :class="toastMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
            {{ toastMessage }}
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import router from '../../router';
import { loadStripe } from '@stripe/stripe-js';

const user = ref(null);
const posts = ref([]);
const isLoading = ref(true);
const filterActive = ref(1);
const isProfileOpen = ref(false);
const isCreatePostOpen = ref(false);
const isLoggingOut = ref(false);
const toastMessage = ref('');
let toastTimeout = null;

const isSupportModalOpen = ref(false);
const isProcessing = ref(false);
const donationAmount = ref(10);
const selectedPostId = ref(null);
let stripe = null;
let cardElement = null;

const bloodTypes = ref([]);

watch(filterActive, () => {
    fetchPosts();
});

async function fetchBloodTypes() {
    try {
        const response = await axios.get('/bloodtypes');
        bloodTypes.value = response.data.data || response.data;
    } catch (error) {
        console.error('fetchBloodTypes error:', error);
    }
}

const newPost = ref({
    description: '',
    blood_type: '',
    location: '',
    needed_by: '',
    mediaFile: null,
    mediaPreview: null,
});

async function fetchPosts() {
    isLoading.value = true;
    try {
        const response = await axios.get('/feed?compatible=' + filterActive.value);
        posts.value = response.data.data
    }
    catch (error) {

    }
    finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    const savedUser = localStorage.getItem('user_data');
    if (savedUser) {
        try {
            user.value = JSON.parse(savedUser);
        } catch (e) {
            console.error('User parse error:', e);
        }
    }
    fetchPosts();
    fetchBloodTypes();
});

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const dt = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - dt) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const isPostValid = computed(() => {
    return newPost.value.description.trim() !== '' &&
        newPost.value.blood_type !== '' &&
        newPost.value.location.trim() !== '';
});

const showToast = (message) => {
    toastMessage.value = message;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toastMessage.value = ''; }, 3000);
};

const submitPost = async () => {
    if (!isPostValid.value) return;

    try {
        const formData = new FormData();
        formData.append('description', newPost.value.description);

        // UPDATE: Change 'blood_type' to 'blood_type_id' to match your backend
        formData.append('blood_type_id', newPost.value.blood_type);

        formData.append('location', newPost.value.location);

        if (newPost.value.needed_by) {
            formData.append('needed_by', newPost.value.needed_by);
        }

        if (newPost.value.mediaFile) {
            formData.append('media_path', newPost.value.mediaFile);
        }

        // Send the request
        await axios.post('/feed', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // 3. UI Cleanup
        isCreatePostOpen.value = false;
        showToast('Request posted successfully!');

        // Reset the form
        newPost.value = {
            description: '',
            blood_type: '',
            location: '',
            needed_by: '',
            mediaFile: null,
            mediaPreview: null
        };

        // Refresh the feed to show the new post
        await fetchPosts();

    } catch (error) {
        console.error('submitPost error:', error);
        // Hint: If you get a 422, check your console to see which field failed validation
        showToast('Could not post — check your details.');
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    newPost.value.mediaFile = file;
    newPost.value.mediaPreview = URL.createObjectURL(file);
};

const removeImage = () => {
    if (newPost.value.mediaPreview) URL.revokeObjectURL(newPost.value.mediaPreview);
    newPost.value.mediaFile = null;
    newPost.value.mediaPreview = null;
};

async function logout() {
    isLoggingOut.value = true;
    try {
        await axios.post('/logout');
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('user_data');
        localStorage.removeItem('user_route');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
    }
}

const openSupportModal = async (post) => {
  selectedPostId.value = post.id;
  isSupportModalOpen.value = true;

  if (!stripe) {
    stripe = await loadStripe('pk_test_51T3yYyDluo6RdWeVcZ0B1sr9RqOoGBwI50V1ET5UFAfHQknOGASQxwfoyjGZdnJgrWGlgxvgnGW1BAxVdUPckpIL00P8OwoRnO');
  }
  const elements = stripe.elements();
  cardElement = elements.create('card', {
    style: { base: { fontSize: '16px', color: '#1c1e21' } },
  });

  setTimeout(() => cardElement.mount('#card-element'), 100);
};
const processSupport = async () => {
    if (!donationAmount.value || donationAmount.value <= 0) return;
    isProcessing.value = true;

    try {
        const { data } = await axios.post(`/feed/${selectedPostId.value}/donate`, {
            amount: donationAmount.value,
        });

        const result = await stripe.confirmCardPayment(data.client_secret, {
            payment_method: { card: cardElement },
        });

        if (result.error) {
            showToast(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            showToast('Payment processed. Thank you.');
            closeSupportModal();
        }
    } catch (e) {
        showToast('Payment failed — please try again.');
    } finally {
        isProcessing.value = false;
    }
};

const closeSupportModal = () => {
  isSupportModalOpen.value = false;
  if (cardElement) {
    cardElement.unmount();
    cardElement = null;
  }
};
</script>

<style>
body {
    font-family: 'Inter', sans-serif;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>