"use client";

import { useMemo, useState } from "react";

const weightPresets = [40, 60, 80, 100, 120, 140];
const repPresets = [1, 3, 5, 8, 10, 12];
const percentLevels = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5];

const numberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const quickButtonClassName = [
  "rounded-xl",
  "border",
  "border-gray-300",
  "px-3",
  "py-1",
  "text-sm",
  "hover:border-gray-400",
  "active:scale-[.99]",
  "transition",
  "dark:border-gray-700",
  "dark:hover:border-gray-600",
].join(" ");

function formatKg(value: number) {
  return `${numberFormatter.format(Math.round(value * 10) / 10)} kg`;
}

export default function OneRepMaxPage() {
  const [weightInput, setWeightInput] = useState("100");
  const [repsInput, setRepsInput] = useState("5");

  const { hasValues, epley, brzycki, average, reference1RM, reps } = useMemo(() => {
    const sanitizedWeight = weightInput.replace(",", ".").trim();
    const sanitizedReps = repsInput.replace(",", ".").trim();

    const weightValue = sanitizedWeight === "" ? Number.NaN : Number(sanitizedWeight);
    const repsValue = sanitizedReps === "" ? Number.NaN : Number(sanitizedReps);

    const validWeight = Number.isFinite(weightValue) && weightValue > 0;
    const validReps = Number.isFinite(repsValue) && repsValue > 0;

    const epleyEstimate = validWeight && validReps ? weightValue * (1 + repsValue / 30) : Number.NaN;
    const brzyckiEstimate =
      validWeight && validReps && repsValue < 37 ? weightValue * (36 / (37 - repsValue)) : Number.NaN;

    const collected = [epleyEstimate, brzyckiEstimate].filter((value) => Number.isFinite(value));
    const averageEstimate =
      collected.length > 0 ? collected.reduce((sum, value) => sum + value, 0) / collected.length : Number.NaN;

    const preferred = Number.isFinite(epleyEstimate)
      ? epleyEstimate
      : Number.isFinite(averageEstimate)
        ? averageEstimate
        : Number.NaN;

    return {
      hasValues: validWeight && validReps,
      epley: epleyEstimate,
      brzycki: brzyckiEstimate,
      average: averageEstimate,
      reference1RM: preferred,
      reps: repsValue,
    };
  }, [weightInput, repsInput]);

  const zones = Number.isFinite(reference1RM)
    ? percentLevels.map((percent) => ({
        percent,
        load: reference1RM * percent,
      }))
    : [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">1RM-Rechner</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Berechne dein theoretisches Ein-Wiederholungs-Maximum (1RM) anhand der Epley- und Brzycki-Formel und leite
          Trainingsgewichte für verschiedene Intensitäten ab.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px),1fr]">
        <div className="card p-5 space-y-5">
          <div className="space-y-2">
            <label className="space-y-1 block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Bewegtes Gewicht (kg)</span>
              <input
                className="input"
                type="number"
                min="0"
                step="0.5"
                value={weightInput}
                onChange={(event) => setWeightInput(event.target.value)}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {weightPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setWeightInput(String(preset))}
                  className={quickButtonClassName}
                >
                  {preset} kg
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="space-y-1 block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Wiederholungen</span>
              <input
                className="input"
                type="number"
                min="1"
                step="1"
                value={repsInput}
                onChange={(event) => setRepsInput(event.target.value)}
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {repPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setRepsInput(String(preset))}
                  className={quickButtonClassName}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Geschätztes 1RM</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Die Epley-Formel dient als Referenzwert; Brzycki liefert eine konservative Vergleichsschätzung.
              </p>
            </div>

            {hasValues && Number.isFinite(reference1RM) ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Epley</p>
                  <p className="text-3xl font-semibold">{formatKg(epley)}</p>
                </div>
                <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Brzycki</p>
                  <p className="text-3xl font-semibold">
                    {Number.isFinite(brzycki) ? formatKg(brzycki) : "–"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Gib Gewicht und Wiederholungen ein, um dein 1RM zu berechnen.</p>
            )}

            {hasValues && Number.isFinite(epley) && Number.isFinite(brzycki) ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mittelwert aus beiden Formeln: <strong>{formatKg(average)}</strong>
              </p>
            ) : null}

            {hasValues && (!Number.isFinite(brzycki) || reps >= 37) ? (
              <p className="text-sm text-amber-600">
                Die Brzycki-Formel ist für mehr als 36 Wiederholungen nicht sinnvoll einsetzbar.
              </p>
            ) : null}
          </div>

          <div className="card p-5 space-y-4">
            <h2 className="text-xl font-semibold">Trainingszonen</h2>
            {zones.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Intensität</th>
                    <th className="py-2">Zielgewicht</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map(({ percent, load }) => (
                    <tr key={percent} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-2">{Math.round(percent * 100)}%</td>
                      <td className="py-2">{formatKg(load)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Die Intensitätsbereiche erscheinen, sobald ein gültiges 1RM berechnet wurde.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
