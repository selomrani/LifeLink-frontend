<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <!-- Top Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center gap-2">
            <!-- Blood Drop Logo Icon -->
            <div class="bg-red-100 p-2 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <h1 class="text-xl font-bold text-gray-900 tracking-tight">LifeLink Admin</h1>
          </div>
          <div class="flex items-center gap-4">
            <button @click="viewProfile" class="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">View Profile</button>
            <button @click="handleLogout" class="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Logout</button>
            <span class="text-sm border-l border-gray-300 pl-4 font-medium text-gray-500 hidden sm:block">Welcome, Admin</span>
            <div class="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Dashboard Content -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="mb-8 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">Platform Overview</h2>
        <button @click="viewAllUsers" class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm">
          View All Users
        </button>
      </div>

      <!-- Loading Skeletons (Shows while fetching data) -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div v-for="i in 5" :key="i" class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse h-full flex flex-col justify-between min-h-[140px]">
          <div class="flex items-start justify-between">
            <div class="w-full mr-4">
              <div class="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
              <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="h-12 w-12 bg-gray-200 rounded-xl shrink-0"></div>
          </div>
          <div class="mt-6 h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Stats Grid (Shows when data is ready) -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div
            v-for="stat in dashboardStats"
            :key="stat.title"
            @click="handleStatClick(stat)"
            class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all cursor-pointer flex flex-col justify-between h-full"
        >
          <!-- Top section -->
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0 flex-1">
              <!-- Added 'truncate' to prevent long text like "Total Financial Support" from wrapping and breaking alignment -->
              <p class="text-sm font-medium text-gray-500 mb-1 truncate" :title="stat.title">{{ stat.title }}</p>
              <h3 class="text-3xl font-bold text-gray-900">{{ stat.value }}</h3>
            </div>
            <!-- Added 'shrink-0' so the icon doesn't squeeze when text is long -->
            <div :class="`p-3 rounded-xl shrink-0 ${stat.bgClass} ${stat.textClass}`">
              <span v-html="stat.icon"></span>
            </div>
          </div>

          <!-- Bottom section (Trend) -->
          <div class="mt-4 flex items-center text-sm pt-2">
            <span :class="stat.trendUp ? 'text-green-600' : 'text-red-600'" class="font-medium flex items-center gap-1">
              <svg v-if="stat.trendUp" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
              {{ stat.trendValue }}
            </span>
            <span class="text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
      </div>

      <!-- Recent Reports Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 class="text-lg font-bold text-gray-800">Pending User Reports</h3>
          <a href="#" class="text-sm font-medium text-red-600 hover:text-red-800">View all reports &rarr;</a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-white border-b border-gray-100 text-sm text-gray-500">
              <th class="px-6 py-4 font-medium">Reported User</th>
              <th class="px-6 py-4 font-medium">Reported By</th>
              <th class="px-6 py-4 font-medium">Reason</th>
              <th class="px-6 py-4 font-medium">Status</th>
              <th class="px-6 py-4 font-medium text-right">Action</th>
            </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
            <tr v-for="report in recentReports" :key="report.id" class="hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {{ report.reportedName.charAt(0) }}
                  </div>
                  <span class="font-medium text-gray-900">{{ report.reportedName }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ report.reporterName }}</td>
              <td class="px-6 py-4">
                <span class="text-gray-900 font-medium">{{ report.reason }}</span>
              </td>
              <td class="px-6 py-4">
                  <span class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {{ report.status }}
                  </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-red-600 hover:text-red-800 font-medium text-sm transition-colors">
                  Review
                </button>
              </td>
            </tr>
            <tr v-if="recentReports.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                No pending reports. Great job!
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const isLoading = ref(true)

const viewProfile = () => {
  console.log('Navigate to profile...')
}

const handleLogout = () => {
  console.log('Logging out...')
}

const handleStatClick = (stat) => {
  console.log(`Navigating to details for: ${stat.title}`)
}

const viewAllUsers = () => {
  console.log('Navigating to all users list...')

}

const apiData = ref({
  users: 0,
  livesSaved: 0,
  totalMoney: 0,
  requests: 0,
  reports: 0
})

const dashboardStats = computed(() => [
  {
    title: 'Total Users',
    value: apiData.value.users.toLocaleString(),
    trendUp: true,
    trendValue: '12%',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
  },
  {
    title: 'Lives Saved',
    value: apiData.value.livesSaved.toLocaleString(),
    trendUp: true,
    trendValue: '8%',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>'
  },
  {
    title: 'Active Requests',
    value: apiData.value.requests.toLocaleString(),
    trendUp: false,
    trendValue: '3%',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
  },
  {
    title: 'Pending Reports',
    value: apiData.value.reports.toLocaleString(),
    trendUp: true,
    trendValue: '2 new',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>'
  },
  {
    title: 'Total Funds',
    value: `$${apiData.value.totalMoney.toLocaleString()}`,
    trendUp: true,
    trendValue: '18%',
    bgClass: 'bg-green-50',
    textClass: 'text-green-600',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  }
])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/statistics')
    apiData.value = response.data
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
  } finally {
    isLoading.value = false
  }
})

// Dummy Data
const recentReports = ref([
  {
    id: 1,
    reportedName: 'John Doe',
    reporterName: 'Sarah Smith',
    reason: 'Spam / Fake Request',
    status: 'Pending'
  },
  {
    id: 2,
    reportedName: 'Ahmed Y.',
    reporterName: 'Karim B.',
    reason: 'Inappropriate Behavior',
    status: 'Pending'
  },
  {
    id: 3,
    reportedName: 'Mina L.',
    reporterName: 'System Admin',
    reason: 'Duplicate Account',
    status: 'Pending'
  }
])
</script>