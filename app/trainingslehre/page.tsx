import principles from "@/data/training_principles.json";
import normatives from "@/data/training_normatives.json";
import periodization from "@/data/periodization_examples.json";

export default function TrainingslehrePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Trainingslehre</h1>
      <p className="text-gray-600">Wesentliche Prinzipien & Normative in kompakter Form.</p>
      <div className="grid-cards">
        {principles.map((p, i) => (
          <div key={i} className="card p-5">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-gray-700 mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="card p-5">
        <h3 className="font-semibold text-lg mb-2">Reizschwelle (Kurzfassung)</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Unterschwellige Reize: keine Anpassung</li>
          <li>Wirksamer Reiz: fördert Anpassung</li>
          <li>Zu starker Reiz: Überlastung/Regress</li>
        </ul>
      </div>
      <div className="card p-5">
        <h3 className="font-semibold text-lg mb-2">Belastungsnormative</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {normatives.map((n) => (
            <li key={n.name}>
              <span className="font-medium">{n.name}:</span> {n.desc}
            </li>
          ))}
        </ul>
      </div>
      <div className="card p-5">
        <h3 className="font-semibold text-lg mb-2">Periodisierung (Beispiele)</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {periodization.map((p) => (
            <li key={p.name}>
              <span className="font-medium">{p.name}:</span> {p.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
