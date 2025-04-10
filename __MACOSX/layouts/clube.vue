<template>
  <CommonSplashScreen v-show="showSplashScreen" />
  <div
    v-show="!showSplashScreen"
    class="w-full backgroundWallpaper min-h-screen flex flex-col"
  >
    <CommonCabecalhoHome />

    <!-- Wrapper do conteúdo -->
    <div class="flex-grow">
      <slot />
      <PrimeToast />
    </div>

    <!-- Footer sempre no final -->
    <footer class="bg-white text-black py-6 mt-12">
      <div
        class="container mx-auto flex flex-col sm:flex-row justify-between items-center"
      >
        <NuxtLink
          to="/home"
          class="flex-shrink-0"
        >
          <img
            src="@/assets/images/tictoLogo.png"
            alt="Logotipo"
            class="h-20"
          >
        </NuxtLink>

        <div class="flex flex-col items-center sm:items-start">
          <p class="text-sm">
            Email:
            <a
              href="mailto:contato@example.com"
              class="text-blue-400"
            >contato@example.com</a>
          </p>
          <p class="text-sm">
            Telefone:
            <a
              href="tel:+1234567890"
              class="text-blue-400"
            >+12 345 678 90</a>
          </p>
          <div class="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              class="text-blue-400 hover:text-white"
            >
              <i class="pi pi-facebook" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              class="text-blue-400 hover:text-white"
            >
              <i class="pi pi-twitter" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              class="text-blue-400 hover:text-white"
            >
              <i class="pi pi-instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { Summary, Severity } from "../composables/common/toastCustom";

  const showSplashScreen = ref(true);
  const authRequest = useAuthRequest();
  const route = useRoute();

  onBeforeMount(() => {
    if (route.path.includes("/cart") || route.path.includes("/pedido")) {
      authRequest.validarSessao().then(() => {
        showSplashScreen.value = false;
      });
    } else {
      showSplashScreen.value = false;
    }
  });
</script>
