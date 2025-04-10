<template>
  <div>
    <CommonSplashScreen v-show="showSplashScreen" />
    <div
      v-show="!showSplashScreen"
      class="flex bg-[#ecebf0] dark:bg-[#050307]"
    >
      <CommonMenuPrincipal ref="menuPrincipal" />
      <div class="flex-grow min-h-screen" style="max-width: calc(100vw - 7rem);">
        <CommonCabecalhoSistema
          @toggle-menu-principal="menuPrincipal?.toggleMenuPrincipal"
        />
        <div class="w-screen p-0 sm:w-full">
          <slot />
        </div>
      </div>
      <PrimeToast />
      <PrimeConfirmDialog />
    </div>
  </div>
</template>

<script setup>
  import { Summary, Severity } from "../composables/common/toastCustom";

  const showSplashScreen = ref(true);
  const authRequest = useAuthRequest();
  const menuPrincipal = ref(null);

  onBeforeMount(() => {
    showSplashScreen.value = false;
    // authRequest.validarSessao().then(() => {
    //   showSplashScreen.value = false;
    // });
  });
</script>
