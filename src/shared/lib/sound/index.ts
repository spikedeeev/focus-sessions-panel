const startSoundUrl = new URL("../../sounds/start.mp3", import.meta.url).href;
const endSoundUrl = new URL("../../sounds/end.mp3", import.meta.url).href;

const startAudio =
  typeof Audio !== "undefined" ? new Audio(startSoundUrl) : null;
const endAudio = typeof Audio !== "undefined" ? new Audio(endSoundUrl) : null;

const playAudio = (audio: HTMLAudioElement | null) => {
  if (!audio) {
    return;
  }

  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch {
    // ignore audio playback errors
  }
};

export const playStartSound = () => playAudio(startAudio);
export const playEndSound = () => playAudio(endAudio);
