import { useElevatorStore } from '../store/useElevatorStore';

export default function Floor({ floorNumber }) {
  const addRequest = useElevatorStore((state) => state.addRequest);
  const requests = useElevatorStore((state) => state.requests);
  const currentFloor = useElevatorStore((state) => state.currentFloor);

  const isRequested = requests.includes(floorNumber);
  const isHere = currentFloor === floorNumber;

  return (
    <div className={`h-[50px] flex items-center justify-between border-b border-slate-800/40 px-4 transition-all duration-300 ${
      isHere ? 'bg-blue-500/5' : 'bg-transparent'
    }`}>
      {/* Label de l'étage */}
      <div className="flex items-center gap-3">
        <span className={`font-mono text-xs tracking-widest ${isHere ? 'text-blue-400 font-bold' : 'text-slate-500'}`}>
          {floorNumber === 0 ? 'NIVEAU 0 (RDC)' : `NIVEAU 0${floorNumber}`}
        </span>
        {isHere && (
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
          </span>
        )}
      </div>

      {/* Bouton d'action optimisé */}
      <button
        onClick={() => addRequest(floorNumber)}
        disabled={isHere}
        className={`w-24 py-1.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-150 border active:scale-95 ${
          isRequested
            ? 'bg-amber-500/10 border-amber-500/80 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
            : isHere
            ? 'bg-slate-900/40 border-slate-800/80 text-slate-600 cursor-not-allowed opacity-40'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800'
        }`}
      >
        {isRequested ? '● EN ATTENTE' : '⭥ APPEL'}
      </button>
    </div>
  );
}
