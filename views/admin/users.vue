<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans py-8">
    <main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Page Header -->
      <div class="mb-8 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav class="flex text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
            <a href="#" class="hover:text-red-600 transition-colors">Dashboard</a>
            <span class="mx-2">/</span>
            <span class="text-gray-900 font-medium">User Management</span>
          </nav>
          <h2 class="text-2xl font-bold text-gray-900">All Users</h2>
          <p class="mt-1 text-sm text-gray-500">Manage all registered users, donors, and administrators.</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <!-- Optional: Add a search bar or export button here in the future -->
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="text" class="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2 border" placeholder="Search users...">
          </div>
        </div>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50/50">
            <tr>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Blood Type</th>
              <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th scope="col" class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">

            <!-- Skeleton Loader -->
            <tr v-if="isLoading" v-for="i in 3" :key="'skel-'+i" class="animate-pulse">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div class="ml-4">
                    <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="h-6 bg-gray-200 rounded-full w-16"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="h-6 bg-gray-200 rounded-full w-12"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
              <td class="px-6 py-4 whitespace-nowrap text-right"><div class="h-8 bg-gray-200 rounded-lg w-16 ml-auto"></div></td>
            </tr>

            <!-- Real Data -->
            <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-50/50 transition-colors group">

              <!-- User Info (Avatar, Name, Email) -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm" :src="user.profilePhotoUrl" alt="" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.fullName }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="px-6 py-4 whitespace-nowrap">
                  <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                      :class="{
                      'bg-purple-100 text-purple-800': user.role === 'admin',
                      'bg-blue-100 text-blue-800': user.role === 'donor',
                      'bg-gray-100 text-gray-800': user.role !== 'admin' && user.role !== 'donor'
                    }"
                  >
                    {{ user.role || 'User' }}
                  </span>
              </td>

              <!-- Blood Type -->
              <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="user.bloodType" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                    {{ user.bloodType }}
                  </span>
                <span v-else class="text-sm text-gray-400 italic">Unknown</span>
              </td>

              <!-- Joined Date -->
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.joinedAt }}
              </td>

              <!-- Actions (Ban Button) -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    @click="handleBanUser(user)"
                    class="inline-flex items-center justify-center px-3 py-1.5 border border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                  Ban User
                </button>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="!isLoading && users.length === 0">
              <td colspan="5" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                <p class="mt-1 text-sm text-gray-500">There are currently no users registered in the system.</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Placeholder -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">97</span> results
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios"
const isLoading = ref(false)
const users = ref([
  {
    "id": 12,
    "fullName": "Darius Lowery",
    "email": "mucolenib@mailinator.com",
    "profilePhotoUrl": "https://amzn-lifelink-storage.s3.us-east-1.amazonaws.com/posts_media/191VV3ICxXATOLtnf60ys9HyizDVMm8Xyvh3SgdB.jpg",
    "bloodType": "O+",
    "role": "donor",
    "joinedAt": "Apr 29, 2026"
  },
  {
    "id": 13,
    "fullName": "Sarah Jenkins",
    "email": "sarah.j@example.com",
    "profilePhotoUrl": "https://ui-avatars.com/api/?name=Sarah+Jenkins&color=7F9CF5&background=EBF4FF",
    "bloodType": "A-",
    "role": "admin",
    "joinedAt": "Apr 30, 2026"
  }
])

const handleBanUser = async (user) => {
  // Good UX: Always confirm destructive actions!
  if (confirm(`Are you absolutely sure you want to ban ${user.fullName}?`)) {
    console.log(`Banning user ID: ${user.id}`)

  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await axios.get('/api/users')
    users.value = response.data.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
  } finally {
    isLoading.value = false
  }
  */
})
</script>