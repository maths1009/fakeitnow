<script setup lang="ts">
import { ref, onMounted } from "vue";
import DeviceDetector from "device-detector-js";
import Window from "./components/Window.vue";
import MacOS from "./components/MacOS.vue";
import { useFullscreen } from "./hooks/useFullScreen";

const containerRef = ref<HTMLElement | null>(null);
const deviceType = ref<string | undefined>(undefined);

const { enter } = useFullscreen(containerRef);
const device = new DeviceDetector().parse(navigator.userAgent);

onMounted(() => {
  deviceType.value = device.os?.name;
});
</script>

<template>
  <div class="container" @click="enter" ref="containerRef">
    <MacOS v-if="deviceType === 'Mac'" />
    <Window v-else-if="deviceType === 'Windows'" />
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
