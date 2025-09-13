export type RegionKey = "ruecken" | "brust" | "schultern" | "arme" | "bauch" | "glutes" | "quads" | "hamstrings" | "waaden";
export type Muscle = {
  id: string;
  name: string;
  group: string;
  regions: RegionKey[];
  summary: string;
  origin: string[];
  insertion: string[];
  function: string[];
  exercises?: string[];
  tips?: string[];
};
