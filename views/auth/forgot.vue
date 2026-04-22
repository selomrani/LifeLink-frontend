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
          <a href="#" class="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 rounded-full transition-colors">
            Join as Donor
          </a>
        </div>
      </div>
    </header>

    <main class="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

      <div class="w-full max-w-md">
        <div class="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
          
          <div v-if="!isSubmitted">
            <div class="flex justify-center mb-8">
              <div class="bg-red-50 p-4 rounded-2xl animate-float">
                <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>

            <div class="text-center mb-10">
              <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Forgot Password?</h1>
              <p class="text-slate-500 text-balance">No worries, enter your email and we'll send you reset instructions.</p>
            </div>

            <form @submit.prevent class="space-y-6">
              <div class="space-y-2">
                <label for="email" class="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:ring-0 transition-all outline-none placeholder:text-slate-400"
                  placeholder="name@example.com">
              </div>

              <button 
                type="submit"
                class="relative w-full py-4 mt-2 text-base font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-xl shadow-red-100 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center overflow-hidden">
                <span>Send Reset Link</span>
              </button>
            </form>
          </div>

          <div v-else class="text-center py-4">
            <div class="flex justify-center mb-6">
              <div class="bg-green-50 p-4 rounded-full">
                <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h2 class="text-2xl font-extrabold text-slate-900 mb-3">Check your email</h2>
            <p class="text-slate-500 mb-8 text-balance">
              We've sent a password reset link to <br/>
              <span class="font-semibold text-slate-700">user@example.com</span>
            </p>
            
            <div class="space-y-4">
              <button class="w-full py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                Open Mail App
              </button>
              <p class="text-sm text-slate-500 font-medium">
                Didn't receive the email? 
                <button class="text-red-600 hover:text-red-700 font-bold ml-1 transition-colors">
                  Click to resend
                </button>
              </p>
            </div>
          </div>
        </div>

        <p class="text-center mt-8 text-slate-600 font-medium">
          Remember your password?
          <a href="#" class="text-red-600 hover:text-red-700 font-bold ml-1 transition-colors flex items-center justify-center inline-flex gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>