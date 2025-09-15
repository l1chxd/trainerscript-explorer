'use client';

import React, { useEffect, useMemo, useState } from "react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import BodyMap from "@/components/BodyMap";
import MuscleCard from "@/components/MuscleCard";
import type { Muscle, RegionKey } from "@/types";
import musclesData from "@/data/muscles.json";

const REGION_OPTIONS: RegionKey[] = [
  "ruecken",
  "brust",
  "schultern",
  "arme",
  "bauch",
  "glutes",
  "quads",
  "hamstrings",
  "waaden",
];

const parseRegionParam = (value: string | null): RegionKey | "all" => {
  if (!value) {
    return "all";
  }

  const regionValue = value as RegionKey;
  return REGION_OPTIONS.includes(regionValue) ? regionValue : "all";
};

function AnatomiePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const initialRegion = parseRegionParam(searchParams.get("region"));
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState<RegionKey | "all">(initialRegion);
  const muscles = musclesData as Muscle[];

  const fuse = useMemo(() => {
    return new Fuse<Muscle>(muscles, {
      keys: [
        "name",
        "group",
        "summary",
        "origin",
        "insertion",
        "function",
        "exercises",
        "tips",
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [muscles]);

  const filtered = useMemo(() => {
    const matchesRegion = (muscle: Muscle) =>
      region === "all" ? true : muscle.regions.includes(region);

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return muscles.filter(matchesRegion);
    }

    const fuzzyMatches = fuse.search(trimmedQuery).map((result) => result.item);

    return fuzzyMatches.filter(matchesRegion);
  }, [fuse, muscles, query, region]);

  useEffect(() => {
    const nextRegion = parseRegionParam(searchParams.get("region"));
    const nextQuery = searchParams.get("q") ?? "";

    setRegion(current => (current === nextRegion ? current : nextRegion));
    setQuery(current => (current === nextQuery ? current : nextQuery));
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (region !== "all") {
      params.set("region", region);
    }

    if (query.length > 0) {
      params.set("q", query);
    }

    const nextQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    if (nextQueryString === currentQueryString) {
      return;
    }

    const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;
    router.replace(nextUrl as Route, { scroll: false });
  }, [region, query, pathname, router, searchParams]);

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
          {REGION_OPTIONS.map((r) => (
            <button key={r} className={`btn ${region===r ? "bg-gray-100" : ""}`} onClick={()=>setRegion(r)}>{r}</button>
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

export default function AnatomiePage() {
  return (
    <React.Suspense fallback={null}>
      <AnatomiePageContent />
    </React.Suspense>
  );
}
