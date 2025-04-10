<template>
  <div>
    <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 loginWallpaper">
      <slot />
      <PrimeToast />
    </div>
  </div>
</template>

<script setup>
  import { Summary, Severity } from "../composables/common/toastCustom";
</script>