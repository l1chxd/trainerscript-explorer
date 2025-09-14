'use client';

import { motion } from "framer-motion";
import type { RegionKey } from "@/types";

export default function BodyMap({ onSelect }: { onSelect: (region: RegionKey) => void }) {
  // detailed SVG silhouette with clickable regions
  const regions: { key: RegionKey; label: string; path: string }[] = [
    { key: "ruecken", label: "Rücken", path: "M75 90 C75 70 125 70 125 90 L125 170 C125 200 75 200 75 170 Z" },
    { key: "brust", label: "Brust", path: "M75 90 C75 80 125 80 125 90 L125 130 L75 130 Z" },
    { key: "schultern", label: "Schultern", path: "M55 85 C60 60 80 60 90 85 L90 110 L55 110 Z M110 85 C120 60 140 60 145 85 L145 110 L110 110 Z" },
    { key: "arme", label: "Arme", path: "M40 110 C40 150 45 190 60 210 L75 210 L75 110 Z M160 110 C160 150 155 190 140 210 L125 210 L125 110 Z" },
    { key: "bauch", label: "Bauch", path: "M75 130 L125 130 L125 190 C125 210 75 210 75 190 Z" },
    { key: "glutes", label: "Glutes", path: "M75 190 L125 190 L125 230 C125 245 75 245 75 230 Z" },
    { key: "quads", label: "Quads", path: "M75 230 L95 230 L95 330 L75 330 Z M105 230 L125 230 L125 330 L105 330 Z" },
    { key: "hamstrings", label: "Hamstrings", path: "M75 230 L95 230 L95 330 L75 330 Z M105 230 L125 230 L125 330 L105 330 Z" },
    { key: "waaden", label: "Waden", path: "M80 330 L95 330 L95 380 L80 380 Z M105 330 L120 330 L120 380 L105 380 Z" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <svg viewBox="0 0 200 400" className="w-64 h-auto">
        {/* head */}
        <circle cx="100" cy="40" r="25" className="fill-gray-200 stroke-gray-400" />
        {/* torso and hips */}
        <path d="M70 70 C70 50 130 50 130 70 L130 210 C130 260 70 260 70 210 Z" className="fill-gray-100 stroke-gray-300" />
        {/* left arm */}
        <path d="M55 80 C45 120 45 180 55 220 L70 220 L70 80 Z" className="fill-gray-100 stroke-gray-300" />
        {/* right arm */}
        <path d="M145 80 C155 120 155 180 145 220 L130 220 L130 80 Z" className="fill-gray-100 stroke-gray-300" />
        {/* left leg */}
        <path d="M75 210 C75 260 85 320 85 360 L95 360 L95 210 Z" className="fill-gray-100 stroke-gray-300" />
        {/* right leg */}
        <path d="M125 210 C125 260 115 320 115 360 L105 360 L105 210 Z" className="fill-gray-100 stroke-gray-300" />
        {regions.map((r) => (
          <motion.path
            key={r.key}
            d={r.path}
            className="fill-transparent stroke-transparent cursor-pointer"
            whileHover={{ fill: "rgb(229, 231, 235)" }}
            onClick={() => onSelect(r.key)}
          />
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {regions.map((r) => (
          <button key={r.key} className="badge" onClick={() => onSelect(r.key)}>
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
