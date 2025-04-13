<template>
  <NuxtLayout>
    <NuxtPage />
    <div class="purple-glow"></div>
  </NuxtLayout>
</template>

<style scoped>
.purple-glow {
  position: fixed;
  bottom: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(128, 0, 255, 0.4), transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
</style>
