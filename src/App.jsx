import { useElevatorSimulation } from './hooks/useElevatorSimulation';
import Shaft from './components/context/Shaft';
import Floor from './components/Floor';
import CabinControl from './components/CabinControl';
import Indicator from './components/ui/Indicator';

export default function App() {
  useElevatorSimulation(1500);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black tracking-tight text-white">SIMULATEUR D'ASCENSEUR</h1>
      </header>

      <main className="w-full max-w-4xl bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 flex flex-col md:flex-row gap-8 justify-center items-stretch">
        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-bold text-slate-300 mb-3 border-b border-slate-700 pb-1">Vue de l'Immeuble</h2>
          <div className="flex border border-slate-700 rounded-xl overflow-hidden bg-slate-950 p-2 gap-4 h-[520px]">
            <div className="flex-1 flex flex-col justify-between h-[500px]">
              {Array.from({ length: 10 }, (_, i) => 9 - i).map((floorNumber) => (
                <Floor key={floorNumber} floorNumber={floorNumber} />
              ))}
            </div>
            <Shaft />
          </div>
        </div>

        <div className="w-full md:w-64 flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-slate-300 mb-3 border-b border-slate-700 pb-1">Moniteur</h2>
            <Indicator />
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-slate-300 mb-3 border-b border-slate-700 pb-1">Commandes Cabine</h2>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-700 flex justify-center items-center flex-1">
              <CabinControl />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
