<script lang="ts" setup>
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('access_token')

    router.push('/login')
  }
</script>

<template>
  <main class="bg-gray-100 h-screen flex">
    <aside class="w-2/12 h-full bg-white border-r border-gray-300">
      <h4 class=" font-extrabold text-4xl text-gray-700 text-center font-[Lato] border-b border-gray-300 py-4">Easy <span class="text-blue-500">Sales</span></h4>

      <nav class="mt-3 px-3">
        <ul class="flex flex-col gap-y-2">
          <li class="w-full">
            <NuxtLink to="/call" class="px-3 py-3 w-full rounded-md font-medium hover:bg-gray-200 inline-flex gap-3 items-center">
              <Icon name="heroicons:phone-20-solid" />
              Call
            </NuxtLink>
          </li>
          <li class="w-full">
            <NuxtLink to="/history" class="px-3 py-3 w-full rounded-md font-medium hover:bg-gray-200 inline-flex gap-3 items-center">
              <Icon name="tabler:history" />
              History
            </NuxtLink>
          </li>

          <li class="w-full">
            <button class="px-3 py-3 w-full rounded-md font-medium hover:bg-gray-200 inline-flex gap-3 items-center" @click="logout">
              <Icon name="tabler:logout" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="w-10/12  h-full flex flex-col">
      <!-- <header class="w-full h-32 border-b border-gray-300">
        <slot name="header" />
      </header> -->

      <main class="overflow-x-hidden overflow-y-auto w-full flex-1 p-8">
        <slot />
      </main>
    </div>
  </main>
</template>

<style scoped>
  .router-link-active {
    @apply bg-gray-200;
  }
</style>