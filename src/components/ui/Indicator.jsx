import React from 'react';
import { useElevatorStore } from '../../store/useElevatorStore';

export default function Indicator() {
  const { currentFloor, direction, motionStatus, requests, isPaused, togglePause, speedMultiplier, setSpeedMultiplier } = useElevatorStore();

  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-2xl flex flex-col gap-2.5">
      {/* En-tête Status */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">SYS_MONITOR //</span>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-amber-500' : motionStatus === 'MOVING' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
            {isPaused ? 'PAUSED' : motionStatus}
          </span>
        </div>
      </div>

      {/* Affichage Étages */}
      <div className="flex items-center justify-between py-1">
        <div className="text-4xl font-black font-mono text-white tracking-tighter flex items-baseline gap-0.5">
          <span className="text-slate-600 text-lg font-normal">N.</span>
          {currentFloor}
        </div>
        
        <div className="text-right font-mono flex flex-col">
          <span className={`text-[11px] font-black tracking-wider ${direction !== 'IDLE' && !isPaused ? 'text-amber-400' : 'text-slate-600'}`}>
            {isPaused ? '■ PAUSE' : direction === 'UP' ? '▲ MONTE' : direction === 'DOWN' ? '▼ DESCEND' : '■ STATIQUE'}
          </span>
          <span className="text-[9px] text-slate-500 uppercase tracking-tight">
            Portes : {motionStatus === 'DOORS_OPEN' ? 'Ouvertes' : 'Fermées'}
          </span>
        </div>
      </div>

      {/* Boutons Actions Vitesse/Pause */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-900 pt-2.5">
        <button 
          onClick={togglePause}
          className={`py-1 px-2 rounded-md font-mono text-[9px] font-bold tracking-wider transition-all border ${
            isPaused 
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {isPaused ? '▶ START' : '⏸ PAUSE'}
        </button>

        <div className="flex bg-slate-900 rounded-md p-0.5 border border-slate-800">
          {[1, 2, 4].map((v) => (
            <button
              key={v}
              onClick={() => setSpeedMultiplier(v)}
              className={`flex-1 text-[9px] font-mono font-bold py-0.5 rounded transition-all ${
                speedMultiplier === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {v}x
            </button>
          ))}
        </div>
      </div>

      {/* File d'attente simplifiée */}
      <div className="border-t border-slate-900 pt-2 font-mono text-[10px]">
        <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-1">Trajets actifs :</span>
        {requests.length === 0 ? (
          <span className="text-slate-600 italic text-[9px]">Static</span>
        ) : (
          <div className="flex flex-wrap gap-1 items-center">
            {requests.map((r, idx) => (
              <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-bold">
                {r === 0 ? 'RDC' : `N${r}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
