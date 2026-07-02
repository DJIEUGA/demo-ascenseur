import React from 'react';
import { useElevatorStore } from '../store/useElevatorStore';

export default function Floor({ floorNumber }) {
  const addRequest = useElevatorStore((state) => state.addRequest);
  const requests = useElevatorStore((state) => state.requests);
  const currentFloor = useElevatorStore((state) => state.currentFloor);

  const isRequested = requests.includes(floorNumber);
  const isHere = currentFloor === floorNumber;

  return (
    <div className={`flex-1 flex items-center justify-between border-b border-slate-800/30 px-3 transition-all duration-200 ${
      isHere ? 'bg-blue-500/5' : 'bg-transparent'
    }`}>
      {/* Label de l'étage */}
      <div className="flex items-center gap-2">
        <span className={`font-mono text-[11px] tracking-wider ${isHere ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>
          {floorNumber === 0 ? 'NIV 00 (RDC)' : `NIV 0${floorNumber}`}
        </span>
        {isHere && (
          <span className="flex h-1 w-1 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1 w-1 bg-blue-500"></span>
          </span>
        )}
      </div>

      {/* Bouton d'action compact */}
      <button
        onClick={() => addRequest(floorNumber)}
        disabled={isHere}
        className={`w-20 py-1 rounded text-[9px] font-mono font-bold tracking-wider uppercase transition-all border ${
          isRequested
            ? 'bg-amber-500/10 border-amber-500 text-amber-400'
            : isHere
            ? 'bg-slate-900/20 border-transparent text-slate-700 cursor-not-allowed select-none'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        {isRequested ? 'ATTENTE' : '⭥ APPEL'}
      </button>
    </div>
  );
}
