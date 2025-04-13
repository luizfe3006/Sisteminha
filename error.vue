<script setup lang="ts">
  const props = defineProps({
    error: {
      type: Object,
      required: true,
    },
  });

  const handleError = () => clearError({ redirect: '/' });
  const tituloErro = computed(() => {
    const codigoErro = props.error ? props.error.statusCode : null;
    switch (codigoErro) {
      case 404:
        return 'Página não encontrada';
        break;
      default:
        return 'Ocorreu um erro inesperado.';
        break;
    }
  });
</script>

<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 loginWallpaper">
    <div class="text-center h-full">
      <h1 class="text-8xl	font-bold text-slate-500">
        {{ props.error ? props.error.statusCode : '' }}
      </h1>
      <h3 class="text-uppercase text-3xl text-slate-500">
        {{ tituloErro }}
      </h3>
      <p class="text-muted mb-5 text-lg mt-10 text-slate-500">
        {{ props.error ? props.error.message : '' }}
        <br>
        Contate o administrador do sistema.
      </p>
      <PrimeButton
        label="Inicio"
        icon="pi pi-arrow-left"
        @click="handleError"
      />
    </div>
  </div>
</template>