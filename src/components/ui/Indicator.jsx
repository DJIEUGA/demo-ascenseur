import { useElevatorStore } from '../../store/useElevatorStore';

export default function Indicator() {
  const { currentFloor, direction, motionStatus, requests } = useElevatorStore();

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col gap-3">
      {/* En-tête Système */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
        <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">SYS_MONITOR //</span>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${motionStatus === 'MOVING' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
            {motionStatus === 'DOORS_OPEN' ? 'INDEX_OPEN' : motionStatus}
          </span>
        </div>
      </div>

      {/* Affichage Principal */}
      <div className="flex items-center justify-between py-2">
        <div className="text-5xl font-black font-mono text-white tracking-tighter flex items-baseline gap-1">
          <span className="text-slate-600 text-2xl font-normal">N.</span>
          {currentFloor}
        </div>
        
        <div className="text-right font-mono flex flex-col gap-0.5">
          <span className={`text-xs font-black tracking-widest ${direction !== 'IDLE' ? 'text-amber-400' : 'text-slate-600'}`}>
            {direction === 'UP' ? '▲ MONTE' : direction === 'DOWN' ? '▼ DESCEND' : '■ STATIQUE'}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-tight">
            Portes : <span className={motionStatus === 'DOORS_OPEN' ? 'text-blue-400 font-bold' : 'text-slate-400'}>
              {motionStatus === 'DOORS_OPEN' ? 'Ouvertes' : 'Fermées'}
            </span>
          </span>
        </div>
      </div>

      {/* File d'attente réorganisée (Sans Scroll) */}
      <div className="border-t border-slate-900 pt-3 font-mono text-[11px]">
        <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-2">Trajets planifiés :</span>
        {requests.length === 0 ? (
          <span className="text-slate-600 italic text-[10px]">Aucun ordre en mémoire</span>
        ) : (
          <div className="flex flex-wrap gap-1 items-center">
            {requests.map((r, idx) => (
              <span 
                key={idx} 
                className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide"
              >
                {r === 0 ? 'RDC' : `N${r}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
