import { useReducer, useEffect } from "react";

// Daftar state yang bisa diperluas
const STATES = ["red", "green", "yellow"];

// Durasi setiap state
const DURATIONS = {
  red: 5,
  green: 4,
  yellow: 2,
};

// Fungsi transisi otomatis (cycle)
function getNextState(current) {
  const index = STATES.indexOf(current);
  const nextIndex = (index + 1) % STATES.length; // cyclic finite-state-machine.
  return STATES[nextIndex];
}

// Reducer FSM murni & scalable
function fsmReducer(state, event) {
  switch (event.type) {
    case "START":
      return { ...state, running: true };

    case "PAUSE":
      return { ...state, running: false };

    case "RESET":
      return {
        current: STATES[0],
        secondsLeft: DURATIONS[STATES[0]],
        running: false,
      };

    case "TICK":
      if (!state.running) return state;

      if (state.secondsLeft === 1) {
        const next = getNextState(state.current);
        return {
          current: next,
          secondsLeft: DURATIONS[next],
          running: true,
        };
      }

      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
      };

    default:
      return state;
  }
}

// Hook utama
export default function useTrafficLightFSM() {
  const [state, dispatch] = useReducer(fsmReducer, {
    current: STATES[0],
    secondsLeft: DURATIONS[STATES[0]],
    running: false,
  });

  // Effect untuk menangani ticking dengan requestAnimationFrame
  useEffect(() => {
  let lastTimestamp = null;
  let accumulated = 0;
  let frameId = null;

  // Fungsi loop menggunakan requestAnimationFrame
  function loop(timestamp) {
    if (!state.running) return;

    if (lastTimestamp !== null) {
      const delta = (timestamp - lastTimestamp) / 1000; 
      accumulated += delta;

      // Jika akumulasi sudah >= 1 detik → kirim event TICK
      while (accumulated >= 1) {
        dispatch({ type: "TICK" });
        accumulated -= 1;
      }
    }

    lastTimestamp = timestamp;
    frameId = requestAnimationFrame(loop);
  }

  if (state.running) {
    frameId = requestAnimationFrame(loop);
  }

  return () => {
    if (frameId) cancelAnimationFrame(frameId);
  };
}, [state.running]);

// API hook
  return {
    state: state.current,
    secondsLeft: state.secondsLeft,
    running: state.running,
    start: () => dispatch({ type: "START" }),
    pause: () => dispatch({ type: "PAUSE" }),
    reset: () => dispatch({ type: "RESET" }),
  };
}
