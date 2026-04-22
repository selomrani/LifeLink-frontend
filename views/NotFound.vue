<template>
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
        <router-link to="/" class="hover:text-red-600 transition-colors">Home</router-link>
        <router-link to="/how-it-works" class="hover:text-red-600 transition-colors">How it Works</router-link>
        <router-link to="/centers" class="hover:text-red-600 transition-colors">Centers</router-link>
      </nav>
      <div class="flex gap-4">
        <router-link to="/register"
          class="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 rounded-full transition-colors">
          Join as Donor
        </router-link>
      </div>
    </div>
  </header>

  <!-- STREAMING_CHUNK: Rendering the main 404 card... -->
  <main class="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <!-- Background blur effect -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] -z-10 opacity-60">
    </div>

    <div class="w-full max-w-lg">
      <!-- Main Card -->
      <div class="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10 text-center">

        <!-- STREAMING_CHUNK: Rendering the floating graphic... -->
        <!-- Floating Icon -->
        <div class="flex justify-center mb-6">
          <div class="bg-red-50 p-5 rounded-3xl animate-float">
            <!-- Compass / Lost Icon -->
            <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 15v-3m0 0a2 2 0 100-4 2 2 0 000 4z" />
              <!-- X mark replacing the standard lock to indicate 'not found' or 'broken' -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 13l4 4m0-4l-4 4"
                class="text-white" style="mix-blend-mode: difference;" />
            </svg>
          </div>
        </div>

        <!-- STREAMING_CHUNK: Rendering the typography and action buttons... -->
        <!-- Typography -->
        <div class="mb-8">
          <h1 class="text-7xl sm:text-8xl font-black text-slate-900 tracking-tight mb-4 relative">
            404
            <!-- Decorative dot -->
            <span class="absolute bottom-2 -right-2 sm:right-10 w-4 h-4 bg-red-600 rounded-full animate-pulse"></span>
          </h1>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
            Page not found
          </h2>
          <p class="text-slate-500 text-balance leading-relaxed">
            Oops! It looks like the page you are looking for has been misplaced, moved, or doesn't exist anymore.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <router-link to="/"
            class="inline-flex justify-center items-center px-6 py-4 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-xl shadow-red-100 transition-all transform hover:-translate-y-1 active:scale-[0.98]">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </router-link>
          <router-link to="/support"
            class="inline-flex justify-center items-center px-6 py-4 text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98]">
            Contact Support
          </router-link>
        </div>
      </div>
    </div>
  </main>

  <!-- STREAMING_CHUNK: Rendering the footer... -->
  <footer class="py-8 text-center text-slate-400 text-sm mt-auto">
    <p>&copy; 2026 LifeLink. Saving lives together.</p>
  </footer>
</template>