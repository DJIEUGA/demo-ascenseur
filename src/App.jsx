import React from 'react';
import { useElevatorSimulation } from './hooks/useElevatorSimulation';
import Shaft from './components/context/Shaft';
import Floor from './components/Floor';
import CabinControl from './components/CabinControl';
import Indicator from './components/ui/Indicator';
import { useElevatorStore } from './store/useElevatorStore';

export default function App() {
  // Initialisation du métronome
  useElevatorSimulation(1500);
  
  // Récupération des logs pour les afficher sur la colonne de gauche
  const logs = useElevatorStore((state) => state.logs);

  return (
    <div className="h-screen bg-slate-900 text-slate-100 p-4 flex flex-col justify-between overflow-hidden">
      {/* HEADER COMPACT */}
      <header className="text-center mb-2">
        <h1 className="text-xl font-black tracking-tight text-white uppercase">Simulateur d'Ascenseur</h1>
        <p className="text-slate-500 text-[11px] font-mono">Tableau de bord</p>
      </header>

      {/* ZONE PRINCIPALE SANS SCROLL */}
      <main className="flex-1 max-w-5xl w-full mx-auto bg-slate-800/40 border border-slate-800 p-4 rounded-2xl flex gap-6 items-stretch justify-center overflow-hidden">
        
        {/* COLONNE GAUCHE : IMMEUBLE + HISTORIQUE */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* L'Immeuble */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <h2 className="text-xs font-bold text-slate-400 mb-1.5 font-mono uppercase tracking-wider">Vue de l'Immeuble</h2>
            <div className="flex border border-slate-800 rounded-xl overflow-hidden bg-slate-950 p-2 gap-4 flex-1 items-center justify-between">
              {/* Grille des étages */}
              <div className="flex-1 flex flex-col justify-between h-full">
                {Array.from({ length: 10 }, (_, i) => 9 - i).map((floorNumber) => (
                  <Floor key={floorNumber} floorNumber={floorNumber} />
                ))}
              </div>
              {/* Cage d'ascenseur (hauteur contrainte en CSS via Shaft) */}
              <Shaft />
            </div>
          </div>

          {/* BONUS : Déplacement de l'Historique en bas à gauche */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/60 h-[120px] flex flex-col gap-1.5 overflow-hidden">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase block border-b border-slate-900 pb-1">
              LOGS_STREAM - HISTORIQUE DES DÉPLACEMENTS
            </span>
            <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1 pr-1 text-slate-400 scrollbar-thin">
              {logs.length === 0 ? (
                <span className="text-slate-600 italic">En attente d'événements...</span>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className={`truncate ${index === 0 ? 'text-blue-400 font-semibold' : 'text-slate-500'}`}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : MONITEUR + COMMANDES CABINE */}
        <div className="w-64 flex flex-col gap-4 justify-between overflow-hidden">
          {/* Moniteur épuré (sans la partie log en bas) */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold text-slate-400 mb-1.5 font-mono uppercase tracking-wider">Instrumentation</h2>
            <Indicator />
          </div>

          {/* Commandes Internes Cabine */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <h2 className="text-xs font-bold text-slate-400 mb-1.5 font-mono uppercase tracking-wider">Cabine Interne</h2>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center items-center flex-1 overflow-hidden">
              <CabinControl />
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
