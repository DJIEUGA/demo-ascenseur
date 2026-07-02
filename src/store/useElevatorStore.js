import { create } from 'zustand';
import { ElevatorStrategy } from '../core/elevatorStrategy';

export const useElevatorStore = create((set, get) => ({
  // États existants
  currentFloor: 0,
  direction: 'IDLE',       
  motionStatus: 'STOPPED', 
  requests: [],

  // ÉTATS BONUS
  isPaused: false,
  speedMultiplier: 1, // 1x, 2x, 4x
  logs: [],

  // CONTROLEURS BONUS
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  setSpeedMultiplier: (multiplier) => set({ speedMultiplier: multiplier }),
  addLog: (message) => set((state) => ({
    logs: [`[${new Date().toLocaleTimeString()}] ${message}`, ...state.logs.slice(0, 19)] // Garde les 20 derniers logs
  })),

  // MUTATIONS EXISTANTES OPTIMISÉES AVEC LOGS
  addRequest: (floor) => set((state) => {
    if (state.requests.includes(floor)) return state;
    const newRequests = [...state.requests, floor];
    
    get().addLog(`Nouvel appel enregistré pour le Niveau ${floor}`);

    let nextDir = state.direction;
    let nextStatus = state.motionStatus;
    if (state.direction === 'IDLE') {
      nextDir = ElevatorStrategy.getNextDirection(state.currentFloor, state.direction, newRequests);
      nextStatus = nextDir !== 'IDLE' ? 'MOVING' : 'STOPPED';
      if (nextDir !== 'IDLE') get().addLog(`Départ de la cabine en direction : ${nextDir}`);
    }

    return { 
      requests: newRequests,
      direction: nextDir,
      motionStatus: nextStatus
    };
  }),

  removeRequest: (floor) => set((state) => ({
    requests: state.requests.filter((r) => r !== floor)
  })),

  step: () => {
    const { currentFloor, direction, requests, motionStatus, isPaused, speedMultiplier } = get();

    if (isPaused || motionStatus === 'DOORS_OPEN') return;

    if (ElevatorStrategy.shouldStopAt(currentFloor, requests)) {
      set({ motionStatus: 'DOORS_OPEN' });
      get().removeRequest(currentFloor);
      get().addLog(`Arrivée au Niveau ${currentFloor} - Ouverture des portes`);

      // Le temps d'ouverture s'adapte aussi à la vitesse choisie !
      setTimeout(() => {
        const updatedRequests = get().requests;
        const nextDir = ElevatorStrategy.getNextDirection(currentFloor, direction, updatedRequests);
        
        set({ 
          motionStatus: nextDir !== 'IDLE' ? 'MOVING' : 'STOPPED',
          direction: nextDir
        });
        get().addLog(`Fermeture des portes. Prochaine action : ${nextDir}`);
      }, 2500 / speedMultiplier);
      return;
    }

    if (motionStatus === 'MOVING') {
      let nextFloor = currentFloor;
      if (direction === 'UP' && currentFloor < 9) nextFloor = currentFloor + 1;
      else if (direction === 'DOWN' && currentFloor > 0) nextFloor = currentFloor - 1;
      
      if (nextFloor !== currentFloor) {
        set({ currentFloor: nextFloor });
        get().addLog(`Passage au Niveau ${nextFloor}`);
      }
    }
  }
}));
