<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8081/api';
axios.defaults.headers.common['Accept'] = 'application/json';

const bloodTypes = ref([]);
const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    bloodType: '',
    password: '',
    password_confirmation: '',
    agreeToTerms: false
});

async function fetchBloodTypes() {
    try {
        const response = await axios.get('/bloodtypes');
        bloodTypes.value = response.data.data;

        console.log("Loaded types:", bloodTypes.value);
    } catch (error) {
        console.error("Data assignment error:", error);
    }
}

onMounted(() => {
    fetchBloodTypes();
});
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
                    <router-link to="/how-it-works" class="hover:text-red-600 transition-colors">How it
                        Works</router-link>
                    <router-link to="/centers" class="hover:text-red-600 transition-colors">Donation
                        Centers</router-link>
                </nav>

                <div class="flex gap-4">
                    <router-link to="/login"
                        class="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors inline-flex items-center">
                        Log In
                    </router-link>
                </div>
            </div>
        </header>

        <main
            class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50 rounded-full blur-[100px] -z-10 opacity-60">
            </div>

            <div class="w-full max-w-lg">
                <div class="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">

                    <div class="flex justify-center mb-8">
                        <div class="bg-red-50 p-4 rounded-2xl animate-float">
                            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                    </div>

                    <div class="text-center mb-10">
                        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Join LifeLink</h1>
                        <p class="text-slate-500 text-balance">Become a donor today and start saving lives in your
                            community.</p>
                    </div>

                    <form @submit.prevent="handleRegister" class="space-y-5">

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="space-y-2">
                                <label for="firstName" class="text-sm font-bold text-slate-700 ml-1">First Name</label>
                                <input v-model="form.firstName" type="text" id="firstName" required
                                    class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                    placeholder="John">
                            </div>
                            <div class="space-y-2">
                                <label for="lastName" class="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                                <input v-model="form.lastName" type="text" id="lastName" required
                                    class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                    placeholder="Doe">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="email" class="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <input v-model="form.email" type="email" id="email" required
                                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                placeholder="name@example.com">
                        </div>

                        <div class="space-y-2">
                            <label for="bloodType" class="text-sm font-bold text-slate-700 ml-1">Blood Type
                                (Optional)</label>
                            <div class="relative">
                                <select v-model="form.bloodType" id="bloodType"
                                    class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none appearance-none text-slate-700">
                                    <option value="" disabled>Select your blood type</option>

                                    <option v-for="type in bloodTypes" :key="type.id" :value="type.id">
                                        {{ type.name }}
                                    </option>

                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="space-y-2">
                                <label for="password" class="text-sm font-bold text-slate-700 ml-1">Password</label>
                                <input v-model="form.password" type="password" id="password" required minlength="8"
                                    class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                    placeholder="••••••••">
                            </div>
                            <div class="space-y-2">
                                <label for="password_confirmation"
                                    class="text-sm font-bold text-slate-700 ml-1">Confirm</label>
                                <input v-model="form.password_confirmation" type="password" id="password_confirmation"
                                    required minlength="8"
                                    class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                                    placeholder="••••••••">
                            </div>
                        </div>

                        <div class="flex items-start gap-3 ml-1 mt-2">
                            <div class="flex items-center h-5 mt-1">
                                <input v-model="form.agreeToTerms" type="checkbox" id="terms" required
                                    class="w-4 h-4 rounded text-red-600 border-slate-300 focus:ring-red-500 cursor-pointer">
                            </div>
                            <label for="terms" class="text-sm font-medium text-slate-600 cursor-pointer">
                                I agree to the
                                <a href="#" class="text-red-600 hover:underline">Terms of Service</a> and
                                <a href="#" class="text-red-600 hover:underline">Privacy Policy</a>.
                            </label>
                        </div>

                        <button type="submit"
                            class="w-full py-4 mt-4 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-xl shadow-red-100 transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                            Create Account
                        </button>
                    </form>
                </div>

                <p class="text-center mt-8 text-slate-600 font-medium mb-8">
                    Already have an account?
                    <router-link to="/login"
                        class="text-red-600 hover:text-red-700 font-bold ml-1 transition-colors">Log in
                        here</router-link>
                </p>
            </div>
        </main>
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