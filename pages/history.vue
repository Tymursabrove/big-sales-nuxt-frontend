<script lang="ts" setup>
const { $axios } = useNuxtApp()

const access_token = shallowRef<string | null>('')
const calls = shallowRef<any[]>([])
const links = shallowRef<any>({})

definePageMeta({
  middleware: ['auth']
})


onMounted(async () => {
  access_token.value = localStorage.getItem('access_token');

  const { data } = await $axios.get('/api/call', {
    headers: {
      'Authorization': `Bearer ${access_token.value}`
    }
  })

  calls.value = data.data
  links.value = data.links
})

</script>

<template>
  <h1 class=" text-gray-700 font-bold text-3xl">Call History</h1>

  <div class=" rounded-lg shadow mt-8 overflow-hidden border border-gray-200">
    <div class="flex flex-col bg-white p-7">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone Number
                  </th>
                  <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" v-for="call in calls" :key="call.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{
                  call.attributes.client_title }} {{ call.attributes.client_first_name }} {{
                  call.attributes.client_last_name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{
                  call.attributes.phone_number }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium "
                      :status="call.attributes.status">{{ call.attributes.status.toUpperCase() }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <NuxtLink
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      :to="`/call/${call.id}`">View</NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 p-4 border-t flex justify-end">
      <nav class="flex items-center gap-x-1">
        <button type="button"
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          :disabled="links.prev ? false : true">
          <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Previous</span>
        </button>

        <button type="button"
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          :disabled="links.next ? false : true">
          <span>Next</span>
          <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>



<style scoped>
[status="queued"] {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500;
}

[status="calling"] {
  @apply bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500;
}

[status="finished"] {
  @apply bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500;
}
</style>