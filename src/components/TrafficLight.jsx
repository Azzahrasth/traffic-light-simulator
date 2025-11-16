import React from 'react';
import useTrafficLightFSM from './useTrafficLightFSM';

export default function TrafficLight() {
  // Menggunakan hook FSM
  const {
    state,
    secondsLeft,
    running,
    start,
    pause,
    reset,
  } = useTrafficLightFSM();

  // fungsi untuk toggle start/pause
  const toggleStartPause = () => {
    if (running) pause();
    else start();
  };

  // menentukan apakah tulisan timer tampil atau Paused
  const displayText = running ? `${secondsLeft}s left` : "Paused";

  // Render komponen
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ width: 60, margin: '0 auto' }}>
        {['red', 'yellow', 'green'].map(color => (
          <div
            key={color}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              marginBottom: 10,
              backgroundColor: state === color ? color : '#ddd',
              boxShadow: state === color ? '0 0 12px ' + color : 'none',
              transition: '0.3s'
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: 24, marginTop: 10 }}>
        {displayText}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={toggleStartPause}>
          {running ? "Pause" : "Start"}
        </button>

        <button onClick={reset} style={{ marginLeft: 10 }}>
          Reset
        </button>
      </div>
    </div>
  );
}
