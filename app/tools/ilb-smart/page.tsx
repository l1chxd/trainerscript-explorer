"use client";
import { useState } from "react";

export default function ILBSMARTPage() {
  const [start, setStart] = useState(100);
  const [ziel, setZiel] = useState(120);
  const [wochen, setWochen] = useState(8);
  const [goal, setGoal] = useState("Beispielziel");

  const steigerung = wochen > 0 ? ((ziel - start) / wochen).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">ILB/SMART-Planer</h1>
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span>Ausgangsleistung (z. B. 1RM)</span>
            <input className="input" type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} />
          </label>
          <label className="space-y-1">
            <span>Zielleistung</span>
            <input className="input" type="number" value={ziel} onChange={(e) => setZiel(Number(e.target.value))} />
          </label>
          <label className="space-y-1">
            <span>Zeitraum (Wochen)</span>
            <input className="input" type="number" value={wochen} onChange={(e) => setWochen(Number(e.target.value))} />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <span>SMART-Ziel</span>
            <input className="input" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </label>
        </div>
        <p className="text-gray-700">
          Wöchentliche Steigerung: <strong>{steigerung}</strong> Einheiten
        </p>
        <p className="text-gray-700">
          SMART-Ziel: <strong>{goal}</strong>
        </p>
      </div>
    </div>
  );
}
