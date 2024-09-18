<script setup lang="ts">
import DeviceDetector from "device-detector-js";
import Window from "./components/Window.vue";

const device = new DeviceDetector().parse(navigator.userAgent);

console.log(device);

const toggleFullScreen = (toggle: boolean) => {
  if (toggle) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
</script>

<template>
  <div class="container" @click="toggleFullScreen(true)">
    <Window />
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
