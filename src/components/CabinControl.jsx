import { useElevatorStore } from '../store/useElevatorStore';

export default function CabinControl() {
  const addRequest = useElevatorStore((state) => state.addRequest);
  const requests = useElevatorStore((state) => state.requests);
  const currentFloor = useElevatorStore((state) => state.currentFloor);

  return (
    <div className="w-full max-w-[180px] p-2">
      <div className="grid grid-cols-2 gap-3 justify-items-center">
        {Array.from({ length: 10 }, (_, i) => i).map((floor) => {
          const isRequested = requests.includes(floor);
          const isHere = currentFloor === floor;
          
          return (
            <button
              key={floor}
              onClick={() => addRequest(floor)}
              disabled={isHere}
              className={`w-12 h-12 rounded-full border-2 font-bold flex items-center justify-center transition-all text-base ${
                isRequested
                  ? 'bg-amber-500 border-amber-600 text-slate-950 animate-pulse font-black'
                  : isHere
                  ? 'bg-blue-600 border-blue-400 text-white cursor-not-allowed shadow-md shadow-blue-500/20'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 active:scale-95'
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
