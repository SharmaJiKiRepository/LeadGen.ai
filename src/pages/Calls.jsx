import React from 'react';

const CALLS = [
  { id: 1, contact: 'Sarah Johnson', role: 'Lead', time: '2025-10-25 14:12', duration: '00:03:42', audio: null, transcript: 'Discussed quote and move date.' },
  { id: 2, contact: 'Mike Chen', role: 'Prospect', time: '2025-10-24 10:05', duration: '00:07:20', audio: null, transcript: 'Asked about packing services.' },
  { id: 3, contact: 'Emily Rodriguez', role: 'Customer', time: '2025-10-22 09:45', duration: '00:01:50', audio: null, transcript: 'Confirmed next steps.' },
];

export default function Calls() {
  const [selected, setSelected] = React.useState(CALLS[0]);
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }

  function onSelect(call) {
    setSelected(call);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
      <div className="bg-white border border-slate-200 rounded-xl p-4 lg:col-span-1">
        <div className="font-semibold mb-3">Calls</div>
        <div className="space-y-2 max-h-[380px] overflow-auto pr-1">
          {CALLS.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelect(c)}
              className={`p-3 rounded-md border cursor-pointer ${selected.id === c.id ? 'bg-slate-50 border-sky-200' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className="font-medium">{c.contact}</div>
              <div className="text-xs text-slate-500">{c.role}</div>
              <div className="text-xs text-slate-400 mt-1">{c.time} · {c.duration}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{selected.contact}</div>
            <div className="text-sm text-slate-500">{selected.role} · {selected.time}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Duration</div>
            <div className="font-medium">{selected.duration}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <audio ref={audioRef} src={selected.audio || undefined} onEnded={() => setPlaying(false)} />
          <button onClick={togglePlay} className="px-3 py-2 rounded-md border border-slate-200">
            {playing ? 'Pause' : 'Play'}
          </button>
          <div className="text-sm text-slate-600">{selected.transcript}</div>
        </div>

        <div className="mt-4">
          <div className="font-semibold">Transcript</div>
          <p className="text-slate-700 mt-1 text-sm">{selected.transcript}</p>
        </div>
      </div>
    </div>
  );
}


