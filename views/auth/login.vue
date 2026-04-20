<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const errors = ref({});
const errorMessage = ref('');

const form = ref({
    email: '',
    password: '',
    remember: false
});
onMounted(() => {
    const token = localStorage.getItem('token');
});

const handleLogin = async () => {
    errors.value = {};
    errorMessage.value = '';

    try {
        const response = await axios.post('/login', form.value);
        const { route, user, token } = response.data;
        localStorage.setItem('user_data', JSON.stringify(user));
        localStorage.setItem('user_route', route);
        localStorage.setItem('auth_token', token);
        router.push(route === 'admin' ? '/dashboard' : '/feed');

    } catch (error) {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors;
        } else if (error.response?.status === 401) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = "An unexpected error occurred.";
        }
    }
};
</script>

<template>
    <div class="min-h-screen bg-slate-50 text-slate-800 selection:bg-red-200 selection:text-red-900 font-inter">
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    <span class="text-2xl font-bold tracking-tight text-slate-900">
                        Life<span class="text-red-600">Link</span>
                    </span>
                </div>
                <nav class="hidden md:flex gap-8 font-medium text-slate-600">
                    <router-link to="/" class="hover:text-red-600 transition-colors">Home</router-link>
                    <a href="#" class="hover:text-red-600 transition-colors">How it Works</a>
                    <a href="#" class="hover:text-red-600 transition-colors">Centers</a>
                </nav>
                <div class="flex gap-4">
                    <router-link to="/register"
                        class="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 rounded-full transition-colors">
                        Join as Donor
                    </router-link>
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
                        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
                        <p class="text-slate-500 text-balance">Log in to manage your donations and save lives.</p>
                    </div>

                    <div v-if="errorMessage"
                        class="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl text-center font-semibold">
                        {{ errorMessage }}
                    </div>

                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <div class="space-y-2">
                            <label for="email" class="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <input v-model="form.email" type="email" id="email"
                                :class="{ 'border-red-500': errors.email || errorMessage }"
                                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                placeholder="name@example.com">
                            <p v-if="errors.email" class="text-red-500 text-xs ml-1">{{ errors.email[0] }}</p>
                        </div>

                        <div class="space-y-2">
                            <div class="flex justify-between items-center px-1">
                                <label for="password" class="text-sm font-bold text-slate-700">Password</label>
                                <a href="#"
                                    class="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors">Forgot
                                    password?</a>
                            </div>
                            <input v-model="form.password" type="password" id="password"
                                :class="{ 'border-red-500': errors.password || errorMessage }"
                                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                placeholder="••••••••">
                            <p v-if="errors.password" class="text-red-500 text-xs ml-1">{{ errors.password[0] }}</p>
                        </div>

                        <div class="flex items-center gap-2 ml-1">
                            <input v-model="form.remember" type="checkbox" id="remember"
                                class="w-4 h-4 rounded text-red-600 border-slate-300 focus:ring-red-500 cursor-pointer">
                            <label for="remember"
                                class="text-sm font-medium text-slate-600 cursor-pointer select-none">Remember me for 30
                                days</label>
                        </div>

                        <button type="submit"
                            class="w-full py-4 mt-2 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-xl shadow-red-100 transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                            Sign In to LifeLink
                        </button>
                    </form>
                </div>

                <p class="text-center mt-8 text-slate-600 font-medium">
                    Don't have an account?
                    <router-link to="/register"
                        class="text-red-600 hover:text-red-700 font-bold ml-1 transition-colors">Join the
                        community</router-link>
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