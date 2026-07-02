import { create } from 'zustand';
import { ElevatorStrategy } from '../core/elevatorStrategy';

export const useElevatorStore = create((set, get) => ({
  currentFloor: 0,
  direction: 'IDLE',       // 'UP', 'DOWN', 'IDLE'
  motionStatus: 'STOPPED', // 'MOVING', 'STOPPED', 'DOORS_OPEN'
  requests: [],

  addRequest: (floor) => set((state) => {
    if (state.requests.includes(floor)) return state;
    const newRequests = [...state.requests, floor];
    
    // Si l'ascenseur était arrêté, on calcule immédiatement sa prochaine direction
    let nextDir = state.direction;
    let nextStatus = state.motionStatus;
    if (state.direction === 'IDLE') {
      nextDir = ElevatorStrategy.getNextDirection(state.currentFloor, state.direction, newRequests);
      nextStatus = nextDir !== 'IDLE' ? 'MOVING' : 'STOPPED';
    }

    return { 
      requests: newRequests,
      direction: nextDir,
      motionStatus: nextStatus
    };
  }),

  removeRequest: (floor) => set((state) => {
    const newRequests = state.requests.filter((r) => r !== floor);
    return { requests: newRequests };
  }),

  setDirection: (direction) => set({ direction }),
  setMotionStatus: (motionStatus) => set({ motionStatus }),

  // Le moteur appelle cette fonction à chaque cycle (Tick)
  step: () => {
    const { currentFloor, direction, requests, motionStatus } = get();

    if (motionStatus === 'DOORS_OPEN') return;

    // 1. Si on doit s'arrêter à cet étage
    if (ElevatorStrategy.shouldStopAt(currentFloor, requests)) {
      set({ motionStatus: 'DOORS_OPEN' });
      get().removeRequest(currentFloor);

      // Simuler l'attente des portes, puis recalculer la suite
      setTimeout(() => {
        const updatedRequests = get().requests;
        const nextDir = ElevatorStrategy.getNextDirection(currentFloor, direction, updatedRequests);
        set({ 
          motionStatus: nextDir !== 'IDLE' ? 'MOVING' : 'STOPPED',
          direction: nextDir
        });
      }, 2500);
      return;
    }

    // 2. Sinon, on continue d'avancer dans la direction actuelle
    if (motionStatus === 'MOVING') {
      if (direction === 'UP' && currentFloor < 9) {
        set({ currentFloor: currentFloor + 1 });
      } else if (direction === 'DOWN' && currentFloor > 0) {
        set({ currentFloor: currentFloor - 1 });
      }
    }
  }
}));
