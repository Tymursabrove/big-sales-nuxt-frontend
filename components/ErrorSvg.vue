
<script lang="ts" setup>
  type Prop = {
    hidden?: boolean,
  }
  
  const props = withDefaults(defineProps<Prop>(), {
    hidden: true
  })
</script>

<template>
  <div class="absolute inset-y-0 end-0 pointer-events-none pe-3" :class="{hidden: props.hidden}">
    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
    </svg>
  </div>
</template>
