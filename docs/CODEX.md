# Trainerscript Explorer – CODEX (Projektleitfaden)

> **Ziel:** Inhalte aus dem HSFA-Skript kuratiert in **eigene JSON/Markdown-Dateien** übertragen – **ohne PDF im Repo**. Die App rendert ausschließlich unsere Dateien.

## Rechte & Quellen
- **Primärquelle:** HSFA_B-Lizenz_V24.4-2 (lokal, nicht eingecheckt).
- **Nutzungsrecht:** liegt vor.
- **Transparenz:** Jede Daten- oder Content-Datei erhält einen `source`-Block mit Seitenangabe.
- **Disclaimer:** Ersetzt keine medizinische Beratung.

## Ordnerstruktur
- `data/` → strukturierte Fakten (JSON): Muskeln, Übungen, Verletzungen, Zonen, Prinzipien …
- `content/` → erklärende Kapitel (Markdown): Reizschwelle, Energiebereitstellung, Karvonen, 6 C’s …
- `docs/` → Leitfäden (dieser Codex), Quellen, Issue-Seeds

### Source-Block (Beispiel)
```json
"source": { "doc": "HSFA_B-Lizenz_V24.4-2", "pages": "12–14" }
```

## Redaktionsregeln (kurz)
- Schreiben in **eigenen Worten**; keine Vollabschriften.
- **Kernaussagen, Tabellenwerte, Definitionen** übernehmen – kurz & korrekt.
- Jede Datei enthält eine **Quelle** (Seitenzahlen).
- Einheitliche Terminologie (DE), Maßeinheiten SI, Dezimal-Komma.

## Datenmodelle (Kurzreferenz)
```ts
type Muscle = {
  id: string; name: string; regions: string[];
  origin: string[]; insertion: string[]; function: string[];
  movements?: string[]; synergists?: string[]; antagonists?: string[];
  exercises?: string[]; tips?: string[]; innervation?: string;
  common_errors?: string[]; coaching_cues?: string[];
  source?: { doc: string; pages?: string };
};

type Exercise = {
  id: string; name: string; pattern: "hinge"|"squat"|"h-pull"|"h-push"|"v-pull"|"v-push"|"carry"|"core";
  primary: string[]; secondary?: string[];
  setup: string[]; execution: string[];
  common_errors?: string[]; coaching_cues?: string[];
  regression?: string[]; progression?: string[];
  contraindications?: string[]; safe_alternatives?: string[];
  source?: { doc: string; pages?: string };
};

type Injury = {
  id: string; name: string; description: string;
  red_flags?: string[]; first_aid?: string[];
  related_muscles?: string[]; contraindicated_exercises?: string[]; safe_alternatives?: string[];
  return_to_train?: string[];
  source?: { doc: string; pages?: string };
};

type EnduranceZone = {
  id: string; zone: string; intensity_hint?: string; methods?: string[]; goal?: string;
  source?: { doc: string; pages?: string };
};

type Principle = {
  id: string; title: string; desc: string;
  source?: { doc: string; pages?: string };
};
```

## Inhalte – Status & TODO
- [ ] **Trainingslehre**: Prinzipien, Reizschwelle, Belastungsnormative, Kraftarten, Periodisierung
- [ ] **Anatomie**: Bewegungsrichtungen, Kernmuskeln (Lat, Trapez, Deltoid, Rotatoren, Core, Glutei, Quad, Hamstrings, Waden …)
- [ ] **HKS & Atmung**: Kreisläufe, Blutdruckbereiche, HMV, Atemvolumina, Karvonen
- [ ] **Spezielle TL**: ILB, Energiebereitstellung (ATP-KP, anaerob, aerob), DOMS vs. Laktat
- [ ] **Physiologie**: Zellen/Gewebe, Nerven/Hormone, Lymphsystem, Faszien/Ketten
- [ ] **Kommunikation**: 6 C’s, DISG, Cue-Library
- [ ] **Verletzungen/Erste Hilfe**: PECH, typische Verletzungen, Kontraindikationen & Alternativen
- [ ] **Übungsbibliothek**: Muster (hinge/squat/etc.), Fehlerbilder, Cues, Regression/Progression

## Arbeitsablauf
1. Abschnitt lesen → **Kernaussagen** in Markdown (`content/**`) notieren.
2. Tabellen/Fakten → **JSON-Strukturen** in `data/**` übertragen.
3. `source` mit Seitenangaben ergänzen.
4. Commit-Muster: `feat(content): Reizschwelle (S. 12–14)` oder `feat(data): exercises – RDL (S. 78–80)`

## Roadmap (Auszug)
- Plan-Generator (4–6 Wochen), ILB-Assistent, Übungsbibliothek nach Mustern,
- Injury-Navigator (Red Flags, Alternativen), Tools-Hub (1RM, Karvonen, Volumen, BMR/NEAT),
- Quiz/Karteikarten, PWA/Offline, SEO/OG.
