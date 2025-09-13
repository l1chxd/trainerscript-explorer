import list from "@/data/injuries.json";

export default function VerletzungenPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Verletzungen & Erste Hilfe</h1>
      <div className="grid-cards">
        {list.map((x) => (
          <div key={x.key} className="card p-5">
            <h3 className="font-semibold text-lg">{x.title}</h3>
            <p className="text-gray-700">{x.desc}</p>
          </div>
        ))}
      </div>
      <div className="card p-5 text-sm text-gray-600">
        Hinweis: Diese Seite ersetzt <span className="font-medium">keine</span> medizinische Beratung. Bei Verletzungen ärztlich abklären.
      </div>
    </div>
  );
}
