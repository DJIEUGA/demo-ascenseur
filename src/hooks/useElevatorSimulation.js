import { useEffect } from 'react';
import { useElevatorStore } from '../store/useElevatorStore';

export const useElevatorSimulation = (baseTickRateMs = 1500) => {
  const motionStatus = useElevatorStore((state) => state.motionStatus);
  const direction = useElevatorStore((state) => state.direction);
  const isPaused = useElevatorStore((state) => state.isPaused);
  const speedMultiplier = useElevatorStore((state) => state.speedMultiplier);
  const step = useElevatorStore((state) => state.step);

  useEffect(() => {
    if (isPaused) return; // Arrêt complet du métronome si en pause

    if (motionStatus === 'MOVING' || useElevatorStore.getState().requests.includes(useElevatorStore.getState().currentFloor)) {
      const adjustedTickRate = baseTickRateMs / speedMultiplier;
      
      const interval = setInterval(() => {
        step();
      }, adjustedTickRate);

      return () => clearInterval(interval);
    }
  }, [motionStatus, direction, isPaused, speedMultiplier, step, baseTickRateMs]);
};
