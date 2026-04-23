<template>
    <div
        class="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-red-200 selection:text-red-900 font-inter">
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
                    <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    <span class="text-2xl font-bold tracking-tight text-slate-900">
                        Life<span class="text-red-600">Link</span>
                    </span>
                </div>

                <nav class="hidden md:flex gap-8 font-medium text-slate-600">
                    <router-link to="/" class="hover:text-red-600 transition-colors"
                        active-class="text-red-600">Home</router-link>
                    <router-link to="/how-it-works" class="hover:text-red-600 transition-colors"
                        active-class="text-red-600">How it Works</router-link>
                    <router-link to="/centers" class="hover:text-red-600 transition-colors"
                        active-class="text-red-600">Centers</router-link>
                </nav>

                <div class="flex gap-4">
                    <router-link to="/register"
                        class="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 rounded-full transition-colors">
                        Join as Donor
                    </router-link>
                </div>
            </div>
        </header>

        <main class="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] -z-10 opacity-60">
            </div>

            <div class="w-full max-w-lg">
                <div
                    class="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10 text-center">

                    <div class="flex justify-center mb-6">
                        <div class="bg-red-50 p-5 rounded-3xl animate-float">
                            <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v2" />
                            </svg>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h1
                            class="text-7xl sm:text-8xl font-black text-slate-900 tracking-tight mb-4 relative inline-block">
                            403
                            <span
                                class="absolute bottom-2 -right-6 w-4 h-4 bg-red-600 rounded-full animate-pulse"></span>
                        </h1>
                        <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 mt-2">
                            Access Denied
                        </h2>
                        <p class="text-slate-500 text-balance leading-relaxed">
                            Hold on! You don't have the required permissions to view this page. Please log in with an
                            authorized account to continue.
                        </p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-2">
                        <router-link to="/login"
                            class="inline-flex justify-center items-center px-6 py-4 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-xl shadow-red-100 transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Log In
                        </router-link>
                        <router-link to="/"
                            class="inline-flex justify-center items-center px-6 py-4 text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                            Back to Home
                        </router-link>
                    </div>
                </div>
            </div>
        </main>

        <footer class="py-8 text-center text-slate-400 text-sm mt-auto">
            <p>&copy; 2026 LifeLink. Saving lives together.</p>
        </footer>
    </div>
</template>

<script setup>
// No complex logic needed for this static error view
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-12px);
    }
}

.animate-float {
    animation: float 5s ease-in-out infinite;
}

/* Ensure the layout takes full height even if content is small */
:host {
    display: block;
    min-height: 100vh;
}
</style>