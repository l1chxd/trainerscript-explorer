export default function HKSPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Herz-Kreislauf-System (Kurzüberblick)</h1>
      <div className="grid gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Grundlagen</h3>
          <p className="text-gray-700">Körper- und Lungenkreislauf laufen parallel; Herzklappen steuern Flussrichtungen.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Blutdruck-Bereiche (Erwachsene)</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Optimal: &lt;120 / &lt;80 mmHg</li>
            <li>Normal: &lt;130 / &lt;90 mmHg</li>
            <li>Hochnormal: 130–139 / 85–89 mmHg</li>
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Karvonen-Formel</h3>
          <p className="text-gray-700">Trainingspuls = (HFmax − Ruhepuls) × Faktor (0,6–0,8) + Ruhepuls</p>
        </div>
      </div>
    </div>
  );
}
