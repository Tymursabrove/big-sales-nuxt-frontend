<script lang="ts" setup>
import type { AxiosError } from 'axios';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

const router = useRouter()

const { $axios } = useNuxtApp()

const email = ref('')
const password = ref('')

const errors = shallowRef<Partial<{
  email: string[],
  password: string[],
}>>({})

const loading = ref(false)

const submit = async () => {
  loading.value = true

  try {
    const { data } = await $axios.post(`/api/login`, {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('access_token', data.token)

    router.push('/call')

  } catch (err: any) {
    if (err.response.status !== 422) {
      throw err
    }

    errors.value = err.response.data.errors
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Do not have an account?
          <NuxtLink
            class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            to="/register">
            Register here
          </NuxtLink>
        </p>
      </div>

      <div class="mt-5">

        <!-- Form -->
        <form @submit.prevent="submit">
          <div class="grid gap-y-4">
            <FormGroup name="email" :errors="errors?.email">
              <template #label>Email address</template>
              <TextInput type="email" name="email" id="email" v-model="email" required />
            </FormGroup>

            <FormGroup name="password" :errors="errors?.password">

              <template #label>Password</template>
              <TextInput type="password" name="password" id="password" v-model="password" required />
            </FormGroup>

            <Button class="w-full" :loading="loading">Sign In</Button>
          </div>
        </form>
        <!-- End Form -->
      </div>
    </div>
  </div>
</template>