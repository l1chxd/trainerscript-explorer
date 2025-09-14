"use client";
import { useState } from "react";

export default function HFZonenPage() {
  const [age, setAge] = useState(30);
  const [rest, setRest] = useState(60);

  const hfMax = 220 - Number(age);
  const reserve = hfMax - Number(rest);
  const zones = [0.6, 0.7, 0.8];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">HF-Zonen-Rechner</h1>
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span>Alter</span>
            <input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </label>
          <label className="space-y-1">
            <span>Ruhepuls</span>
            <input className="input" type="number" value={rest} onChange={(e) => setRest(Number(e.target.value))} />
          </label>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr><th>Intensität</th><th>Puls</th></tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z} className="border-t border-gray-200 dark:border-gray-700">
                <td>{Math.round(z * 100)}%</td>
                <td>{Math.round(reserve * z + Number(rest))} bpm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
