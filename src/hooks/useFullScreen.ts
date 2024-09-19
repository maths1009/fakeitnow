import { ref, onUnmounted, Ref } from "vue";

const events = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "mozfullscreenchange",
  "MSFullscreenChange",
];

const methods = [
  "requestFullscreen",
  "webkitRequestFullscreen",
  "mozRequestFullScreen",
  "msRequestFullscreen",
];

export function useFullscreen(el: Ref<HTMLElement | null>) {
  const isFullscreen = ref(false);
  const changeEvent = () =>
    (isFullscreen.value = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    ));

  const callMethod = (methods: string[], context: any) =>
    methods.find((m) => context[m]?.call(context));

  const request = () => el.value && callMethod(methods, el.value);

  const exit = () => callMethod(methods, document);

  const toggle = () => (isFullscreen.value ? exit() : request());

  onUnmounted(() =>
    events.forEach((e) => document.removeEventListener(e, changeEvent))
  );

  return { isFullscreen, enter: request, exit, toggle };
}
