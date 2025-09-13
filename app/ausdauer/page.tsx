import zones from "@/data/endurance.json";

export default function AusdauerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Ausdauer – Zonen & Methoden</h1>
      <p className="text-gray-600">Schneller Überblick über Bereiche, Ziele und typische Methoden.</p>
      <div className="grid gap-4">
        {zones.map((z, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{z.zone}</h3>
              <span className="badge">{z.intensity}</span>
            </div>
            <p className="text-gray-700 mt-1"><span className="font-medium">Ziel:</span> {z.goal}</p>
            <p className="text-gray-700 mt-1"><span className="font-medium">Methoden:</span> {z.methods.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
