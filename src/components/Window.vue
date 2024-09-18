<template>
  <div class="full-screen windows-10">
    <div class="window-10-main-section">
      <div class="loader">
        <span class="pip-0"></span>
        <span class="pip-1"></span>
        <span class="pip-2"></span>
        <span class="pip-3"></span>
        <span class="pip-4"></span>
        <span class="pip-5"></span>
      </div>
      <span class="window-10-main-text">
        <span>Working on updates </span>
        <span id="update-percentage">{{ updatePercentage }}</span
        >% complete.<br />
        <span>Don't turn off your PC. This will take a while.</span>
      </span>
    </div>
    <span class="windows-10-bottom-text"
      >Your PC may restart several times</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "FakeUpdateWindow",
  setup() {
    const updatePercentage = ref(0);
    let updateIntervalID: number | null = null;

    const fakeUpdateProgressSet = (value: number) => {
      updatePercentage.value = value;
    };

    const windowsUpdateHandler = () => {
      const currentPercentage = updatePercentage.value + 1;
      if (currentPercentage > 100) {
        if (updateIntervalID) clearInterval(updateIntervalID);
        updateIntervalID = null;
      } else {
        fakeUpdateProgressSet(currentPercentage);
      }
    };

    const startUpdateTimer = () => {
      const duration = 1000 * 60 * 5;
      fakeUpdateProgressSet(0);
      updateIntervalID = setInterval(windowsUpdateHandler, duration / 100);
    };

    onMounted(() => {
      startUpdateTimer();
    });

    return {
      updatePercentage,
    };
  },
});
</script>

<style scoped>
.windows-10 {
  font-family: "Segoe UI Variable", "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
  font-size: 14px;
  line-height: 1.6;
  background-color: #0079d7;
  color: #fff;
  text-align: center;
  font-weight: 400;
  height: 100%;
}

.windows-10:fullscreen {
  font-size: 22px;
}

@media screen and (max-width: 1024px) {
  .windows-10 {
    font-size: 12px;
    line-height: 1.4;
  }
  .windows-10:fullscreen {
    font-size: 18px;
  }
}

.window-10-main-section {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.window-10-main-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.windows-10-bottom-text {
  position: absolute;
  bottom: max(15px, 10%);
  left: 50%;
  transform: translate(-50%, 0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loader {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: rotate 4s linear infinite;
  margin-bottom: 20px;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.pip-0::after,
.pip-1::after,
.pip-2::after,
.pip-3::after,
.pip-4::after,
.pip-5::after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #fff;
  content: "";
  display: block;
  transform-origin: 20px 20px;
  animation: rotate 4s infinite ease-in-out;
}

.pip-0::after {
  transform: rotate(0);
}

.pip-1::after {
  transform: rotate(20deg);
}

.pip-2::after {
  transform: rotate(40deg);
}

.pip-3::after {
  transform: rotate(60deg);
}

.pip-4::after {
  transform: rotate(80deg);
}

.pip-5::after {
  transform: rotate(100deg);
}
</style>
