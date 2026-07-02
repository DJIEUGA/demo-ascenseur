import { useElevatorStore } from '../store/useElevatorStore';

export default function Cabin() {
  const motionStatus = useElevatorStore((state) => state.motionStatus);
  const isDoorsOpen = motionStatus === 'DOORS_OPEN';

  return (
    <div className="w-full h-full bg-blue-700 rounded border border-blue-900 shadow-md relative overflow-hidden flex items-center justify-between p-0.5">
      <div 
        className="h-full bg-slate-400 border-r border-slate-500 w-1/2 transition-transform duration-500 ease-in-out origin-left"
        style={{ transform: isDoorsOpen ? 'scaleX(0)' : 'scaleX(1)' }}
      />
      <div className="absolute inset-0 bg-yellow-100/20 flex items-center justify-center -z-10">
        <span className="text-[10px] text-white font-bold tracking-widest animate-pulse">👤</span>
      </div>
      <div 
        className="h-full bg-slate-400 border-l border-slate-500 w-1/2 transition-transform duration-500 ease-in-out origin-right"
        style={{ transform: isDoorsOpen ? 'scaleX(0)' : 'scaleX(1)' }}
      />
    </div>
  );
}
