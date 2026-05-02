<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans py-8">
    <main class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-8 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav class="flex text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
            <a href="/dashboard" class="hover:text-red-600 transition-colors">Dashboard</a>
            <span class="mx-2">/</span>
            <span class="text-gray-900 font-medium">Reports</span>
          </nav>
          <h2 class="text-2xl font-bold text-gray-900">User Reports</h2>
          <p class="mt-1 text-sm text-gray-500">Review and action user-submitted reports.</p>
        </div>
        <div class="mt-4 sm:mt-0 flex items-center gap-3">
          <span class="text-sm text-gray-500">
            <span class="font-semibold text-gray-900">{{ pendingCount }}</span> pending
          </span>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input v-model="search" type="text" class="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2 border" placeholder="Search reports...">
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex gap-2 mb-6">
        <button
          v-for="tab in tabs" :key="tab.value"
          @click="activeTab = tab.value"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          :class="activeTab === tab.value
            ? 'bg-red-600 text-white'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50/50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reported User</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reported By</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">

              <!-- Skeleton -->
              <template v-if="isLoading">
                <tr v-for="i in 4" :key="'skel-'+i" class="animate-pulse">
                  <td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gray-200"></div><div class="h-4 bg-gray-200 rounded w-24"></div></div></td>
                  <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
                  <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-28"></div></td>
                  <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-40"></div></td>
                  <td class="px-6 py-4"><div class="h-6 bg-gray-200 rounded-full w-16"></div></td>
                  <td class="px-6 py-4 text-right"><div class="h-8 bg-gray-200 rounded-lg w-16 ml-auto"></div></td>
                </tr>
              </template>

              <!-- Real Rows -->
              <tr v-else v-for="report in filteredReports" :key="report.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700">
                      {{ reportedInitial(report) }}
                    </div>
                    <span class="font-medium text-gray-900 text-sm">{{ reportedName(report) }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ reporterName(report) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ report.reason }}</td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ report.description || '—' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                    :class="{
                      'bg-yellow-100 text-yellow-800': report.status === 'pending',
                      'bg-green-100 text-green-800': report.status === 'resolved',
                      'bg-gray-100 text-gray-600': report.status !== 'pending' && report.status !== 'resolved'
                    }">
                    {{ report.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    v-if="report.status === 'pending'"
                    @click="handleReview(report)"
                    :disabled="report.reviewing"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="report.reviewing" class="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    {{ report.reviewing ? 'Processing…' : 'Ban & Resolve' }}
                  </button>
                  <span v-else class="text-xs text-gray-400 italic">Resolved</span>
                </td>
              </tr>

              <!-- Empty -->
              <tr v-if="!isLoading && filteredReports.length === 0">
                <td colspan="6" class="px-6 py-12 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 class="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                  <p class="mt-1 text-sm text-gray-500">{{ activeTab === 'pending' ? 'All clear — no pending reports.' : 'Nothing matches your search.' }}</p>
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
const reports = ref([])
const search = ref('')
const activeTab = ref('pending')

const tabs = [
  { label: 'Pending', value: 'pending' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'All', value: 'all' },
]

const reportedName = (r) => {
  const u = r.reported_user
  if (!u) return 'Unknown'
  return `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email
}

const reporterName = (r) => {
  const u = r.reporter
  if (!u) return 'Unknown'
  return `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email
}

const reportedInitial = (r) => reportedName(r).charAt(0).toUpperCase()

const pendingCount = computed(() => reports.value.filter(r => r.status === 'pending').length)

const filteredReports = computed(() => {
  let list = reports.value
  if (activeTab.value !== 'all') list = list.filter(r => r.status === activeTab.value)
  const q = search.value.trim().toLowerCase()
  if (q) list = list.filter(r =>
    reportedName(r).toLowerCase().includes(q) ||
    reporterName(r).toLowerCase().includes(q) ||
    (r.reason || '').toLowerCase().includes(q)
  )
  return list
})

const handleReview = async (report) => {
  if (!confirm(`Ban ${reportedName(report)} and resolve this report?`)) return
  report.reviewing = true
  try {
    await axios.put(`/reports/${report.id}/review`)
    const target = reports.value.find(r => r.id === report.id)
    if (target) target.status = 'resolved'
  } catch (error) {
    console.error('Review failed:', error)
  } finally {
    report.reviewing = false
  }
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/reports')
    reports.value = data.data
  } catch (error) {
    console.error('Failed to fetch reports:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
