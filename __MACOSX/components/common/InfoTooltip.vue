<template>
  <span
    v-tooltip="props.texto"
    class="pi pi-question bg-slate-200 text-xs p-1 rounded-full"
  />
</template>

<script setup>
  const props = defineProps({
    texto: {
      type: String,
      required: true,
    },
  });
</script>