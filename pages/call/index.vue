<script lang="ts" setup>
const config = useRuntimeConfig()
const { $axios } = useNuxtApp()
const { push } = useRouter()

definePageMeta({
  middleware: ['auth']
})

const callers = shallowRef<any[]>([])

const country_code = ref('')
const phone = ref('')
const title = ref('')
const first_name = ref('')
const last_name = ref('')
const requirement = ref('')
const caller = ref('')

const caller_id = computed(() => caller.value === 'random' ? '' : caller.value)
const phone_number = computed(() => `${country_code.value}${phone.value}`)

const access_token = ref<string|null>('');
const loading = ref(false)
const error = shallowRef<any>(null);


onMounted(() => {
  access_token.value = localStorage.getItem('access_token');

  $axios.get('/api/callers').then(({data}) => {
    callers.value = data.data
  })
})


const submit = async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await $axios.post('/api/call', {
      title: title.value,
      first_name: first_name.value,
      last_name: last_name.value,
      requirement: requirement.value,
      phone_number: phone_number.value,
      caller_id: caller_id.value,
    }, {
      headers: {
        Authorization: `Bearer ${access_token.value}`,
      }
    })

    push('/history')

  }catch(err) {
    error.value = err
  }finally {
    loading.value = false
  }
}

</script>

<template>
  <h1 class=" text-gray-700 font-bold text-3xl">Call A Customer</h1>

  

  <div class="bg-white p-7 rounded-lg shadow mt-8">
    <div class="bg-red-500 text-sm text-white rounded-lg p-4 mb-7" role="alert" v-if="error">
      <span class="font-bold">Heads Up!</span> Internal Error Happend.
    </div>

    <form action="" @submit.prevent="submit">
      <div class="flex gap-x-5 mb-3">
        <FormGroup name="country_code">
          <template #label>Country Code</template>

          <div class="relative">
            <SelectInput id="country_code" required v-model="country_code">
              <option value="">Choose Country Code</option>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </SelectInput>
          </div>
        </FormGroup>

        <FormGroup name="phone" class=" flex-1" >

          <template #label>Phone Number</template>

          <TextInput name="phone" id="phone" v-model="phone" />
        </FormGroup>

      </div>

      <div class="flex gap-x-5 mb-3">
        <FormGroup name="title" class=" flex-1">

          <template #label>Title</template>

          <SelectInput id="title" name="title" v-model="title">
              <option value="">Choose Title</option>
              <option value="Mr.">Mr.</option>
              <option value="Miss.">Miss.</option>
            </SelectInput>
        </FormGroup>

        <FormGroup name="first_name" class=" flex-1">

          <template #label>First Name</template>

          <TextInput name="first_name" id="first_name" v-model="first_name" />
        </FormGroup>

        <FormGroup name="last_name" class="flex-1">

          <template #label>Last Name</template>

          <TextInput name="last_name" id="last_name" v-model="last_name" />
        </FormGroup>
      </div>

      <FormGroup name="requirement" class="mb-5">

        <template #label>Requirement</template>

        <TextAreaInput name="requirement" id="requirement" v-model="requirement" />
      </FormGroup>

      <div>
        <FormGroup name="caller" class=" flex-1">

          <template #label>Caller</template>

          <SelectInput id="caller" name="caller" v-model="caller">
            <option value="random">Random</option>
            <option v-for="caller in callers" :key="caller.id" :value="caller.id">{{ caller.attributes.name }}</option>
          </SelectInput>
        </FormGroup>

        <!-- Preview Options -->
      </div>

      <Button class="w-full mt-8" :loading="loading">
         Submit
      </Button>
    </form>
  </div>
</template>

<style></style>