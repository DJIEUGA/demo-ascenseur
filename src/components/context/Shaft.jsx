import React from 'react';
import { useElevatorStore } from '../../store/useElevatorStore';
import Cabin from '../Cabin';

export default function Shaft() {
  const currentFloor = useElevatorStore((state) => state.currentFloor);
  
  // Alignement strict basé sur les 10 lignes de la grille (index de 0 à 9)
  const cabinBottomPosition = `${currentFloor * 10}%`;

  return (
    <div className="relative w-20 bg-slate-950 border-x border-slate-800 h-full shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden rounded-md">
      {/* Câbles de suspension en arrière-plan */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-800/80 -translate-x-1/2 z-0" />
      
      {/* Lignes de séparation d'étages pour repère visuel */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="w-full border-b border-slate-900/50 h-[10%] z-0" />
      ))}

      {/* Conteneur de la Cabine - Correction du positionnement et suppression des paddings restrictifs */}
      <div 
        className="absolute left-0 right-0 w-full h-[10%] p-1 transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) z-10"
        style={{ bottom: cabinBottomPosition }}
      >
        <Cabin />
      </div>
    </div>
  );
}
