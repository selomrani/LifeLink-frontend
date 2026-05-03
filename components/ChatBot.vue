<template>
  <div class="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
    <transition name="fade">
      <div v-if="isOpen" class="mb-4 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col" style="height: 540px;">
        <div class="bg-gradient-to-r from-red-600 to-red-700 px-5 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="white">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-white font-bold text-sm">Grace</h3>
              <p class="text-red-100 text-xs">LifeLink Assistant</p>
            </div>
          </div>
          <button @click="isOpen = false" class="p-1.5 hover:bg-white/20 rounded-full transition-colors">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F3F4F6]">
          <div v-for="(msg, idx) in messages" :key="idx" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
            <div :class="['max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                         msg.role === 'user'
                           ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-sm'
                           : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm']">
              {{ msg.content }}
            </div>
          </div>
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 flex items-center gap-1.5">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
            </div>
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input v-model="inputMessage" type="text" placeholder="Ask Grace anything..."
                 class="flex-1 bg-gray-100 border border-gray-200 rounded-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
                 :disabled="isTyping">
          <button type="submit" :disabled="!inputMessage.trim() || isTyping"
                  class="w-10 h-10 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </transition>

    <button v-show="!isOpen" @click="isOpen = true"
            class="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center">
      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="white">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import axios from 'axios';

const isOpen = ref(false);
const inputMessage = ref('');
const messages = ref([]);
const isTyping = ref(false);
const sessionId = ref(null);
const messagesContainer = ref(null);

async function sendMessage() {
  const text = inputMessage.value.trim();
  if (!text || isTyping.value) return;

  messages.value.push({ role: 'user', content: text });
  inputMessage.value = '';
  isTyping.value = true;

  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }

  try {
    const body = { chatInput: text };
    if (sessionId.value) {
      body.sessionId = sessionId.value;
    }

    const { data } = await axios.post('/chat', body);

    messages.value.push({ role: 'assistant', content: data.output });

    if (data.sessionId) {
      sessionId.value = data.sessionId;
    }
  } catch (e) {
    messages.value.push({ role: 'assistant', content: 'Connection error. Please try again.' });
  } finally {
    isTyping.value = false;

    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
