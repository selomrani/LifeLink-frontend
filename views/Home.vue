<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-red-200 selection:text-red-900">

    <!-- Navigation -->
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
          <router-link to="/how-it-works" class="hover:text-red-600 transition-colors">How it Works</router-link>
          <router-link to="/centers" class="hover:text-red-600 transition-colors">Donation Centers</router-link>
        </nav>

        <div class="flex gap-4">
          <router-link to="/login"
            class="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors inline-flex items-center">
            Log In
          </router-link>

          <router-link to="/register"
            class="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 rounded-full transition-colors inline-flex items-center">
            Join as Donor
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main>
      <section class="relative bg-white overflow-hidden">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">

          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left z-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Urgent Needs in Your Area
            </div>
            <h1 class="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Give the gift of <span class="text-red-600 relative">
                Life
                <svg class="absolute w-full h-3 -bottom-1 left-0 text-red-200" viewBox="0 0 100 20"
                  preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" stroke-width="4" fill="none" />
                </svg>
              </span><br>
              Connect with Hope.
            </h1>
            <p class="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              LifeLink bridges the gap between generous donors and recipients in need. Your single donation can save up
              to three lives. Join our community of solidarity today.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                class="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-xl shadow-red-200 transition-all transform hover:-translate-y-1">
                Find a Donation Center
              </button>
              <button
                class="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-full transition-all">
                Request Blood
              </button>
            </div>
          </div>

          <!-- Illustration Area (Solidarity & Care) -->
          <div class="flex-1 relative w-full max-w-lg lg:max-w-none flex justify-center">
            <!-- Decorative background blobs -->
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-50 rounded-full blur-3xl">
            </div>

            <div
              class="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center text-center animate-[float_6s_ease-in-out_infinite]">
              <!-- Custom SVG for Solidarity/Donation -->
              <svg class="w-48 h-48 text-red-500 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  class="fill-red-50 text-red-500" />
                <path d="M12 5v14" class="text-red-600" stroke-width="2" stroke-dasharray="2 2" />
                <circle cx="12" cy="12" r="3" class="fill-white text-red-600" stroke-width="2" />
                <!-- Hands abstract representation -->
                <path d="M7 15h1a2 2 0 0 1 2 2v2" stroke-width="2" />
                <path d="M17 15h-1a2 2 0 0 0-2 2v2" stroke-width="2" />
              </svg>

              <h3 class="text-xl font-bold text-slate-800 mb-2">Solidarity in Action</h3>
              <p class="text-sm text-slate-500">Every drop counts. We securely connect hospitals, centers, and heroes
                like you.</p>

              <div class="mt-6 flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <div class="flex -space-x-2">
                  <div
                    class="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-xs font-bold text-red-600">
                    A+</div>
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">
                    O-</div>
                  <div
                    class="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-600">
                    B+</div>
                </div>
                <span class="text-xs font-medium text-slate-600">Join 1,204 donors today</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Stats / Trust Section -->
      <section class="bg-red-600 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-red-500">
            <div>
              <div class="text-4xl font-black text-white mb-1">2.4k</div>
              <div class="text-red-100 text-sm font-medium uppercase tracking-wide">Donations</div>
            </div>
            <div>
              <div class="text-4xl font-black text-white mb-1">15</div>
              <div class="text-red-100 text-sm font-medium uppercase tracking-wide">Partner Centers</div>
            </div>
            <div>
              <div class="text-4xl font-black text-white mb-1">5k+</div>
              <div class="text-red-100 text-sm font-medium uppercase tracking-wide">Lives Saved</div>
            </div>
            <div>
              <div class="text-4xl font-black text-white mb-1">24/7</div>
              <div class="text-red-100 text-sm font-medium uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}
</style>