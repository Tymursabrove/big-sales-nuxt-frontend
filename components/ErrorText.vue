<template>
  <p class="text-xs text-red-600 mt-2" :class="{hidden: props.hidden}">
    <slot />
  </p>
</template>

<script lang="ts" setup>
  type Prop = {
    hidden?: boolean,
  }

  const props = withDefaults(defineProps<Prop>(), {
    hidden: true
  })
</script>

<style>

</style>