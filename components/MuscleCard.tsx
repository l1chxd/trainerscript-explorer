import { Dumbbell, Info } from "lucide-react";

export default function MuscleCard({ m }: { m: any }) {
  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{m.name}</h3>
        <span className="badge">{m.group}</span>
      </div>
      <p className="text-sm text-gray-600">{m.summary}</p>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div>
          <div className="font-medium mb-1">Ursprung</div>
          <ul className="list-disc pl-4 text-gray-700">
            {m.origin.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-medium mb-1">Ansatz</div>
          <ul className="list-disc pl-4 text-gray-700">
            {m.insertion.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <div className="font-medium mb-1">Funktion</div>
        <ul className="list-disc pl-4 text-gray-700">
          {m.function.map((s: string, i: number) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      {m.exercises?.length ? (
        <div>
          <div className="font-medium mb-1 flex items-center gap-2"><Dumbbell size={16}/> Übungen</div>
          <ul className="list-disc pl-4 text-gray-700">
            {m.exercises.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      ) : null}
      {m.tips?.length ? (
        <div>
          <div className="font-medium mb-1 flex items-center gap-2"><Info size={16}/> Tipps</div>
          <ul className="list-disc pl-4 text-gray-700">
            {m.tips.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
