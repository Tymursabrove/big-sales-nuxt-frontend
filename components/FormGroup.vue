<template>
  <div>
    <InputLabel :for="props.name">
      <slot name="label" />
    </InputLabel>

    <div class="relative">
      <slot />

      <!-- <ErrorSvg v-if="props.errors?.length" :hidden="false" /> -->
    </div>

    <ErrorText v-if="props.errors?.length" :hidden="false">{{ props.errors[0] }}</ErrorText>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    errors?: string[],
    name?: string,
  }>()
</script>

<style>

</style>