export default function PhysiologiePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Physiologie (Kurzüberblick)</h1>
      <div className="grid gap-4">
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Zytologie & Histologie</h3>
          <p className="text-gray-700">Zellen und Gewebe als Grundlage von Struktur und Funktion.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Nervensystem</h3>
          <p className="text-gray-700">Informationsverarbeitung und Ansteuerung der Muskulatur.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Hormone & Muskelaufbau</h3>
          <p className="text-gray-700">Endokrine Regulation von Anpassungen an Training.</p>
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-lg">Faszien & Ketten</h3>
          <p className="text-gray-700">Bindegewebige Vernetzung (myofasziale Ketten) beeinflusst Kraftübertragung.</p>
        </div>
      </div>
    </div>
  );
}
