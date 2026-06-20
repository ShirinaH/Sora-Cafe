let audioContext = null;

function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playTone(frequency, duration, type = 'sine', volume = 0.15) {
  try {
    const ctx = getContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = volume;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    /* audio unavailable */
  }
}

export function playCorrectSound() {
  playTone(523, 0.12);
  setTimeout(() => playTone(659, 0.15), 80);
}

export function playWrongSound() {
  playTone(220, 0.25, 'triangle', 0.12);
}

export function playFlashSound() {
  playTone(440, 0.08, 'sine', 0.08);
}

export function playWinSound() {
  playTone(523, 0.1);
  setTimeout(() => playTone(659, 0.1), 100);
  setTimeout(() => playTone(784, 0.2), 200);
}
