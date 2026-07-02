import React from 'react';
import { useElevatorStore } from '../store/useElevatorStore';

export default function CabinControl() {
  const addRequest = useElevatorStore((state) => state.addRequest);
  const requests = useElevatorStore((state) => state.requests);
  const currentFloor = useElevatorStore((state) => state.currentFloor);

  // Liste ordonnée pour un rendu classique de clavier d'ascenseur (du haut vers le bas)
  const floorsLayout = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="w-full max-w-[200px] p-1 flex flex-col justify-center h-full">
      <div className="grid grid-cols-3 gap-2 justify-items-center content-center">
        {floorsLayout.reverse().map((floor) => {
          const isRequested = requests.includes(floor);
          const isHere = currentFloor === floor;
          
          return (
            <button
              key={floor}
              onClick={() => addRequest(floor)}
              disabled={isHere}
              className={`w-10 h-10 rounded-full border text-xs font-mono font-bold flex items-center justify-center transition-all duration-150 active:scale-95 ${
                isRequested
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)] animate-pulse'
                  : isHere
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 cursor-not-allowed shadow-inner'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {floor === 0 ? 'R' : floor}
            </button>
          );
        })}
      </div>
    </div>
  );
}
