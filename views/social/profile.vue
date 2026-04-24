<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();
const bloodTypes = ref([]);
async function fetchBloodTypes() {
    try {
        const response = await axios.get('/bloodtypes');
        bloodTypes.value = response.data.data;
    } catch (error) {
        console.error("Data assignment error:", error);
    }
}
const user = ref(null);
const showDeleteModal = ref(false);
const photoPreview = ref(null);
const fileInput = ref(null);
const toastMessage = ref('');
let toastTimeout = null;

const showToast = (message) => {
    toastMessage.value = message;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { toastMessage.value = ''; }, 3000);
};

const triggerPhotoUpload = () => {
    fileInput.value.click();
};

const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            photoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

async function updateProfile() {
    try {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('firstname', user.value.firstname);
        formData.append('lastname', user.value.lastname);
        formData.append('email', user.value.email);
        if (!user.value.blood_type_id) {
            formData.append('blood_type_id', user.value.blood_type_id);
        }
        if (fileInput.value.files[0]) {
            formData.append('photo', fileInput.value.files[0]);
        }
        const response = await axios.post('/profile', formData);
        user.value = response.data.user;
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        showToast('Profile updated successfully!');
    } catch (error) {
        console.error("Update error:", error);
        showToast('Failed to update profile. Please try again.');
    }
}

async function deleteAccount() {
    try {
        await axios.delete('/profile');
        showDeleteModal.value = false;
        localStorage.removeItem('user_data');
        localStorage.removeItem('user_route');
        delete axios.defaults.headers.common["Authorization"];
        router.push('/login');
    } catch (error) {
        console.error("Delete error:", error);
    }
}

onMounted(() => {
    fetchBloodTypes();
    const stored = localStorage.getItem('user_data');
    if (!stored) {
        router.push('/login');
        return;
    }
    user.value = JSON.parse(stored);
});
</script>

<template>
    <div class="min-h-screen bg-[#F3F4F6] text-[#1c1e21] pb-12 font-sans selection:bg-red-200">

        <!-- Toast -->
        <transition name="toast">
            <div v-if="toastMessage"
                class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg">
                {{ toastMessage }}
            </div>
        </transition>

        <!-- Sticky Header -->
        <header
            class="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-40 h-16 flex items-center px-4 md:px-8 border-b border-gray-200">
            <router-link to="/feed"
                class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium mr-auto group">
                <div class="p-1.5 rounded-full group-hover:bg-gray-100 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                Back to Feed
            </router-link>
            <span class="text-lg font-bold text-gray-800 absolute left-1/2 -translate-x-1/2">
                Settings
            </span>
        </header>

        <main v-if="user" class="max-w-2xl mx-auto pt-8 px-4 space-y-6">

            <!-- Profile Info Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-bold text-gray-900">Personal Information</h2>
                        <p class="text-sm text-gray-500 mt-1">Update your photo and personal details.</p>
                    </div>
                </div>

                <div class="p-6 space-y-8">
                    <!-- Avatar Upload -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div class="relative group cursor-pointer" @click="triggerPhotoUpload">
                            <div
                                class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                                <img :src="photoPreview || user.profile_photo_url || 'https://ui-avatars.com/api/?name=User&color=7F9CF5&background=EBF4FF'"
                                    class="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                                    alt="Profile Photo">
                            </div>
                            <div
                                class="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <input type="file" ref="fileInput" name="profile_photo" class="hidden" accept="image/*"
                                @change="handlePhotoChange">
                        </div>
                        <div class="flex-1">
                            <button @click="triggerPhotoUpload" type="button"
                                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors mb-2">Change
                                Photo</button>
                            <p class="text-xs text-gray-500">JPG, GIF or PNG. 5MB max.</p>
                        </div>
                    </div>

                    <!-- Form Fields -->
                    <form @submit.prevent="updateProfile" class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">First
                                    Name</label>
                                <input type="text" name="firstname" v-model="user.firstname" required
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 font-medium focus:bg-white transition-colors">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Last
                                    Name</label>
                                <input type="text" name="lastname" v-model="user.lastname" required
                                    class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 font-medium focus:bg-white transition-colors">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email
                                Address</label>
                            <input type="email" name="email" v-model="user.email" required
                                class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 font-medium focus:bg-white transition-colors">
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Blood
                                Type</label>
                            <select name="blood_type_id" v-model="user.blood_type_id" :disabled="!!user.blood_type_id"
                                required
                                class="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-200 font-bold focus:bg-white transition-colors appearance-none"
                                :class="{ 'cursor-pointer': !user.blood_type_id, 'cursor-not-allowed bg-gray-100 text-gray-500 opacity-80': !!user.blood_type_id }">
                                <option disabled value="">Select your blood type...</option>
                                <option v-for="type in bloodTypes" :key="type.id" :value="type.id">
                                    {{ type.name }}
                                </option>
                            </select>
                            <p v-if="user.blood_type_id" class="text-xs text-red-500 mt-2 font-medium">To change your
                                verified blood type, please contact support.</p>
                            <p v-else class="text-xs text-gray-500 mt-2">Your blood type is used to match you with
                                compatible emergency requests. You can only set this once.</p>
                        </div>

                        <div class="pt-4 flex justify-end">
                            <button type="submit"
                                class="px-8 py-3 rounded-xl font-bold text-white transition-all shadow-sm shadow-red-200 bg-red-600 hover:bg-red-700 active:scale-95">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Danger Zone Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden mt-8">
                <div class="p-6 border-b border-red-50 bg-red-50/30 flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-bold text-red-700">Danger Zone</h2>
                        <p class="text-sm text-red-500/80 mt-1">Irreversible and destructive actions.</p>
                    </div>
                </div>
                <div class="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 class="font-bold text-gray-900">Delete Account</h3>
                        <p class="text-sm text-gray-500 mt-1">Once you delete your account, there is no going back.
                            Please be certain.</p>
                    </div>
                    <button type="button" @click="showDeleteModal = true"
                        class="px-6 py-2.5 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors whitespace-nowrap active:scale-95 shrink-0">
                        Delete Account
                    </button>
                </div>
            </div>

        </main>

        <!-- Delete Account Confirmation Modal -->
        <transition name="fade">
            <div v-if="showDeleteModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="showDeleteModal = false"></div>
                <div
                    class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all">
                    <div class="p-6 text-center">
                        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete your account?</h3>
                        <p class="text-sm text-gray-500 mb-6">Are you sure you want to delete your account? All of your
                            data will be permanently removed. This action cannot be undone.</p>

                        <div class="flex gap-3">
                            <button type="button" @click="showDeleteModal = false"
                                class="flex-1 px-4 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                                Cancel
                            </button>
                            <button type="button" @click="deleteAccount"
                                class="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
}
</style>