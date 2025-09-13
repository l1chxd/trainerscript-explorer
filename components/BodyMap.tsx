'use client';

import { motion } from "framer-motion";

type RegionKey =
  | "ruecken" | "brust" | "schultern" | "arme" | "bauch"
  | "glutes" | "quads" | "hamstrings" | "waaden";

export default function BodyMap({ onSelect }: { onSelect: (region: RegionKey) => void }) {
  // A minimal, stylized SVG silhouette with clickable regions
  const regions: { key: RegionKey; label: string; path: string }[] = [
    { key: "ruecken", label: "Rücken", path: "M80,40 C75,10 125,10 120,40 L120,120 L80,120 Z" },
    { key: "brust", label: "Brust", path: "M80,40 C70,70 130,70 120,40 L120,80 L80,80 Z" },
    { key: "schultern", label: "Schultern", path: "M60,40 h30 v15 h-30 Z M110,40 h30 v15 h-30 Z" },
    { key: "arme", label: "Arme", path: "M50,55 v65 h10 V55 Z M130,55 v65 h10 V55 Z" },
    { key: "bauch", label: "Bauch", path: "M80,80 h40 v40 h-40 Z" },
    { key: "glutes", label: "Glutes", path: "M80,120 h40 v20 h-40 Z" },
    { key: "quads", label: "Quads", path: "M80,140 h18 v40 h-18 Z M102,140 h18 v40 h-18 Z" },
    { key: "hamstrings", label: "Hamstrings", path: "M80,140 h18 v40 h-18 Z M102,140 h18 v40 h-18 Z" },
    { key: "waaden", label: "Waden", path: "M82,180 h14 v30 h-14 Z M104,180 h14 v30 h-14 Z" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <svg viewBox="40 0 120 220" className="w-64 h-auto">
        {/* head */}
        <circle cx="100" cy="15" r="12" className="fill-gray-200 stroke-gray-400" />
        {/* torso base */}
        <rect x="80" y="28" width="40" height="132" className="fill-gray-100 stroke-gray-300" rx="6" />
        {/* legs base */}
        <rect x="80" y="160" width="18" height="54" className="fill-gray-100 stroke-gray-300" rx="6" />
        <rect x="102" y="160" width="18" height="54" className="fill-gray-100 stroke-gray-300" rx="6" />
        {/* arms base */}
        <rect x="50" y="55" width="10" height="65" className="fill-gray-100 stroke-gray-300" rx="4" />
        <rect x="130" y="55" width="10" height="65" className="fill-gray-100 stroke-gray-300" rx="4" />
        {regions.map((r) => (
          <motion.path
            key={r.key}
            d={r.path}
            className="fill-transparent stroke-transparent cursor-pointer"
            whileHover={{ fill: "rgb(229, 231, 235)" }}
            onClick={() => onSelect(r.key)}
          >
          </motion.path>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {regions.map(r => (
          <button key={r.key} className="badge" onClick={() => onSelect(r.key)}>{r.label}</button>
        ))}
      </div>
    </div>
  );
}
