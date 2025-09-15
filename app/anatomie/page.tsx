'use client';

import { useEffect, useMemo, useState } from "react";
import BodyMap from "@/components/BodyMap";
import MuscleCard from "@/components/MuscleCard";
import type { Muscle, RegionKey } from "@/types";
import musclesData from "@/data/muscles.json";

export default function AnatomiePage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionKey | "all">("all");
  const muscles = musclesData as Muscle[];

  const filtered = useMemo(() => {
    return muscles.filter(m => {
      const matchText = [m.name, m.group, m.summary, ...m.origin, ...m.insertion, ...m.function, ...(m.exercises??[])]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchRegion = region === "all" ? true : m.regions.includes(region);
      return matchText && matchRegion;
    })
  }, [query, region, muscles]);

  useEffect(() => {
    // reset search when region changes
    setQuery("");
  }, [region]);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <aside className="lg:col-span-1 card p-4 space-y-4">
        <h2 className="font-semibold text-lg">Körperkarte</h2>
        <BodyMap onSelect={(r) => setRegion(r)} />
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Suche</label>
          <input
            className="input"
            placeholder="z.B. Latissimus, Abduktion ..."
            value={query}
            onChange={(event: { target: { value: string } }) => setQuery(event.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className={`btn ${region==="all" ? "bg-gray-100" : ""}`} onClick={()=>setRegion("all")}>Alle</button>
          {["ruecken","brust","schultern","arme","bauch","glutes","quads","hamstrings","waaden"].map((r) => (
            <button key={r} className={`btn ${region===r ? "bg-gray-100" : ""}`} onClick={()=>setRegion(r as RegionKey)}>{r}</button>
          ))}
        </div>
      </aside>
      <section className="lg:col-span-2 space-y-4">
        <div className="text-sm text-gray-500">Treffer: {filtered.length}</div>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m)=> <MuscleCard key={m.id} m={m} />)}
        </div>
        {filtered.length === 0 && (
          <div className="card p-6 text-gray-600">
            Keine Treffer. Wähle eine Region oder ändere die Suche.
          </div>
        )}
      </section>
    </div>
  );
}
