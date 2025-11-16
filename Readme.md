# 🚦 Traffic Light Simulation using Finite State Machine (FSM)

A clean and robust implementation of a traffic light system built with **React**, demonstrating proper timer management, strict **separation of concerns**, and adhering to the **Finite State Machine (FSM)** model for predictable state transitions.

---

## ✨ Key Features & Technical Highlights

This project successfully implements all requirements, including the use of a pure FSM model for reliable state management.

| Feature | Description |
| :--- | :--- |
| **Pure FSM Implementation** | State logic is driven by defined states (`Red`, `Green`, `Yellow`) and specific, unidirectional transitions. This ensures **Scalability** and **FSM Design**. |
| **Strict Light Cycle** | Implements the required sequence: **Red (5s) → Green (4s) → Yellow (2s) → Red**. |
| **Pause & Resume** | The timer and state are completely frozen when paused and precisely resume from the exact remaining time when started. |
| **Reset Functionality** | Instantly returns the system to the initial `Red` state and stops all active timers/cycles. |
| **Separation of Concerns** | The core FSM logic (state transitions, timer management) is abstracted away from the UI components, ensuring the UI is a pure representation of the state. |
| **Edge Case Handling (Optional/Bonus)** | The FSM model inherently handles rapid pause/start without logic corruption, ensuring state integrity. |

---

## 🛠️ Project Structure & Technology Stack

* **Framework:** React (Functional Components with Hooks)
* **State Management:** Local State (FSM implemented via custom hooks/logic).
* **Timer Management:** `setInterval`/`setTimeout` managed carefully to prevent memory leaks and ensure precise pausing/resuming.

---

## 🏃 How to Run the Project

This project requires **Node.js (version 18 or newer)**.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open automatically in your browser (usually on `http://localhost:3000`).