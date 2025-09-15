export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Tools</h1>
      <div className="grid-cards">
        <a className="card p-5 block" href="/tools/hf-zonen">
          <h3 className="font-semibold text-lg">HF-Zonen-Rechner</h3>
          <p className="text-gray-700 mt-1">Berechne Trainingspuls nach Karvonen.</p>
        </a>
        <a className="card p-5 block" href="/tools/1rm">
          <h3 className="font-semibold text-lg">1RM-Rechner</h3>
          <p className="text-gray-700 mt-1">Ermittle dein 1RM nach Epley &amp; Brzycki.</p>
        </a>
        <a className="card p-5 block" href="/tools/ilb-smart">
          <h3 className="font-semibold text-lg">ILB/SMART-Planer</h3>
          <p className="text-gray-700 mt-1">Ziele formulieren & Trainingslast ableiten.</p>
        </a>
      </div>
    </div>
  );
}
