import { useElevatorStore } from '../../store/useElevatorStore';
import Cabin from '../Cabin';

export default function Shaft() {
  const currentFloor = useElevatorStore((state) => state.currentFloor);
  const cabinBottomPosition = `${currentFloor * 10}%`;

  return (
    <div className="relative w-24 bg-slate-950 border-x border-slate-700/80 h-[500px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden">
      {/* Câbles de l'ascenseur en arrière-plan */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-800/60 -translate-x-1/2 z-0" />
      
      {/* Lignes horizontales subtiles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="w-full border-b border-slate-800/40 h-[10%] z-0" />
      ))}

      {/* Cabine animée */}
      <div 
        className="absolute left-0 right-0 p-1.5 w-full h-[10%] transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) z-10"
        style={{ bottom: cabinBottomPosition }}
      >
        <Cabin />
      </div>
    </div>
  );
}
