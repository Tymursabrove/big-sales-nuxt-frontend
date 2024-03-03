<script lang="ts" setup>
  type Prop = {
    loading?: boolean,
  }
  
  const props = withDefaults(defineProps<Prop>(), {
    loading: false
  })
</script>

<template>
    <button type="submit"
        class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" :disabled="props.loading">
        <div v-if="props.loading" class="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
          <span class="sr-only">Loading...</span>
        </div>

        <slot />
    </button>
</template>
