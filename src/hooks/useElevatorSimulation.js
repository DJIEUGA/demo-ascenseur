import { useEffect } from 'react';
import { useElevatorStore } from '../store/useElevatorStore';

export const useElevatorSimulation = (tickRateMs = 1500) => {
  const motionStatus = useElevatorStore((state) => state.motionStatus);
  const direction = useElevatorStore((state) => state.direction);
  const step = useElevatorStore((state) => state.step);

  useEffect(() => {
    // Le moteur ne tourne que si on est en mode actif MOVING ou si on s'apprête à s'arrêter
    if (motionStatus === 'MOVING' || useElevatorStore.getState().requests.includes(useElevatorStore.getState().currentFloor)) {
      const interval = setInterval(() => {
        step();
      }, tickRateMs);

      return () => clearInterval(interval);
    }
  }, [motionStatus, direction, step, tickRateMs]);
};
