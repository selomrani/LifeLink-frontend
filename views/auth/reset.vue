<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const form = ref({
    email: route.query.email || '',
    password: '',
    password_confirmation: '',
    token: route.params.token || route.query.token || '',
});

const errors = ref({});
const successMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirm = ref(false);

async function resetPassword() {
    errors.value = {};
    successMessage.value = '';
    errorMessage.value = '';
    isLoading.value = true;

    try {
        const response = await axios.post('/reset-password', {
            token: form.value.token,
            email: form.value.email,
            password: form.value.password,
            password_confirmation: form.value.password_confirmation,
        });

        successMessage.value = response.data.message;
        setTimeout(() => router.push('/login'), 2000);

    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else if (error.response && error.response.status === 400) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = 'Something went wrong. Please try again.';
        }
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen bg-slate-50 text-slate-800 selection:bg-red-200 selection:text-red-900 font-inter">
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div class="flex items-center gap-2 cursor-pointer">
                    <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    <span class="text-2xl font-bold tracking-tight text-slate-900">
                        Life<span class="text-red-600">Link</span>
                    </span>
                </div>
                <nav class="hidden md:flex gap-8 font-medium text-slate-600">
                    <a href="#" class="hover:text-red-600 transition-colors">Home</a>
                    <a href="#" class="hover:text-red-600 transition-colors">How it Works</a>
                    <a href="#" class="hover:text-red-600 transition-colors">Centers</a>
                </nav>
                <div class="flex gap-4">
                    <a href="#"
                        class="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 rounded-full transition-colors">
                        Join as Donor
                    </a>
                </div>
            </div>
        </header>

        <main class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] -z-10 opacity-60">
            </div>

            <div class="w-full max-w-md">
                <div class="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">

                    <div class="flex justify-center mb-8">
                        <div class="bg-red-50 p-4 rounded-2xl animate-float">
                            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <div class="text-center mb-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Reset Password</h1>
                        <p class="text-slate-500 text-balance">Enter your new password below.</p>
                    </div>

                    <!-- Success message from backend -->
                    <div v-if="successMessage"
                        class="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                        <svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p class="text-green-700 text-sm font-medium">{{ successMessage }} Redirecting to login...</p>
                    </div>

                    <!-- Error message from backend (invalid/expired token) -->
                    <div v-if="errorMessage"
                        class="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
                        <svg class="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p class="text-red-700 text-sm font-medium">{{ errorMessage }}</p>
                    </div>

                    <form @submit.prevent="resetPassword" class="space-y-5">

                        <!-- Email (read-only, pre-filled from URL) -->
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <input v-model="form.email" type="email" id="email" readonly
                                class="w-full px-5 py-4 bg-slate-100 border-2 border-slate-100 rounded-2xl outline-none text-slate-500 cursor-not-allowed" />
                        </div>

                        <!-- New Password -->
                        <div class="space-y-2">
                            <label for="password" class="text-sm font-bold text-slate-700 ml-1">New Password</label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" id="password"
                                    :class="[
                                        'w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 transition-all outline-none placeholder:text-slate-400 pr-14',
                                        errors.password ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-red-500'
                                    ]" placeholder="Min. 8 characters" />
                                <button type="button" @click="showPassword = !showPassword"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                    <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.password" class="text-red-500 text-sm mt-1 ml-1">
                                {{ errors.password[0] }}
                            </p>
                        </div>

                        <!-- Confirm Password -->
                        <div class="space-y-2">
                            <label for="password_confirmation" class="text-sm font-bold text-slate-700 ml-1">Confirm
                                Password</label>
                            <div class="relative">
                                <input v-model="form.password_confirmation" :type="showConfirm ? 'text' : 'password'"
                                    id="password_confirmation" :class="[
                                        'w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 transition-all outline-none placeholder:text-slate-400 pr-14',
                                        errors.password_confirmation ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-red-500'
                                    ]" placeholder="Repeat your password" />
                                <button type="button" @click="showConfirm = !showConfirm"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                    <svg v-if="!showConfirm" class="w-5 h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1 ml-1">
                                {{ errors.password_confirmation[0] }}
                            </p>
                        </div>

                        <button type="submit" :disabled="isLoading"
                            class="relative w-full py-4 mt-2 text-base font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl shadow-xl shadow-red-100 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center overflow-hidden">
                            <svg v-if="isLoading" class="animate-spin w-5 h-5 mr-2 text-white" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span>{{ isLoading ? 'Resetting...' : 'Reset Password' }}</span>
                        </button>
                    </form>
                </div>

                <p class="text-center mt-8 text-slate-600 font-medium">
                    Remember your password?
                    <a href="/login"
                        class="text-red-600 hover:text-red-700 font-bold ml-1 transition-colors inline-flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to log in
                    </a>
                </p>
            </div>
        </main>

        <footer class="py-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 LifeLink. Saving lives together.</p>
        </footer>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
</style>