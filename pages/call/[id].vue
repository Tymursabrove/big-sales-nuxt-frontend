<script lang="ts" setup>
import axios from '~/plugins/axios';

const route = useRoute()
const { $axios } = useNuxtApp()

definePageMeta({
  middleware: ['auth']
})

const call = ref<any>(null)

onMounted(async () => {
  const access_token = localStorage.getItem('access_token')

  const { data } = await $axios.get(`/api/call/${route.params.id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })

  call.value = data.data
})


</script>

<template>
  <h1 class=" text-gray-700 font-bold text-3xl">Call Details</h1>

  <div class="flex gap-x-4 text-gray-600" v-if="call">
    <div class="bg-white p-7 rounded-lg shadow mt-8 w-5/6">
        <p class=" text-xl"><strong>Client's Name:</strong> {{ call.attributes.client_title }} {{ call.attributes.client_first_name }} {{
    call.attributes.client_last_name }}</p>
        <p class="text-xl mb-4"><strong>Phone Number:</strong> {{ call.attributes.phone_number }}</p>

        <p class="mb-2 font-bold">Transcription:</p>
        <div
          class=" w-5/6 h-80 overflow-y-scroll border border-gray-400 p-5"
          v-html="call.relationships.call_meta?.attributes?.transcription ? call.relationships.call_meta?.attributes?.transcription.replace(/(?:\r\n|\r|\n)/g, '<br>') : ''">

        </div>
    </div>

    <div class="bg-white p-7 rounded-lg shadow mt-8 w-1/6 text-gray-700">
      Caller: {{ call.relationships.caller.attributes.name  }} 
      <br>
      Voice: {{ call.relationships.caller.attributes.gender  }} 
      <br>
      <br>

      <p v-if="call.relationships.call_meta">
        Started: {{ call.relationships.call_meta.attributes.started  }}
        <br>
        Ended: {{ call.relationships.call_meta.attributes.ended  }}
      </p>
    </div>
  </div>
</template>

<style></style>