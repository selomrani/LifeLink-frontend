<script setup>
import { ref } from 'vue';
import axios from 'axios';

const form = ref({ email: '' });
const errors = ref({});
const successMessage = ref('');
const isLoading = ref(false);

async function sendEmail() {
    errors.value = {};
    successMessage.value = '';
    isLoading.value = true;

    try {
        const response = await axios.post('/forgot-password', {
            email: form.value.email,
        });

        successMessage.value = response.data.message;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            errors.value = { email: ['Something went wrong. Please try again.'] };
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
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>

                    <div class="text-center mb-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Forgot Password?</h1>
                        <p class="text-slate-500 text-balance">No worries, enter your email and we'll send you reset
                            instructions.</p>
                    </div>

                    <!-- Success message from backend -->
                    <div v-if="successMessage"
                        class="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                        <svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p class="text-green-700 text-sm font-medium">{{ successMessage }}</p>
                    </div>

                    <form @submit.prevent="sendEmail" class="space-y-6">
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <input v-model="form.email" type="email" id="email" :class="[
                                'w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-0 transition-all outline-none placeholder:text-slate-400',
                                errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-red-500'
                            ]" placeholder="name@example.com" />
                            <p v-if="errors.email" class="text-red-500 text-sm mt-1 ml-1">
                                {{ errors.email[0] }}
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
                            <span>{{ isLoading ? 'Sending...' : 'Send Reset Link' }}</span>
                        </button>
                    </form>
                </div>

                <p class="text-center mt-8 text-slate-600 font-medium">
                    Remember your password?
                    <a href="#"
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