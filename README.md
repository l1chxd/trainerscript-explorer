# TrainerScript Explorer

Interaktive Übersicht (Next.js + Tailwind) über Anatomie, Trainingslehre, Ausdauer, HKS, Physiologie sowie Verletzungen. Klickbare Körperkarte, Filter, Suche und modulare JSON-Daten.

> ⚠️ **Rechte/Urheberrecht:** Dieses Repo enthält **nur paraphrasierte Kurzfassungen** und Demo-Daten. Wenn du Inhalte aus deinem Skript vollständig übernehmen möchtest, stelle sicher, dass du die Rechte dafür besitzt.

## Features

- ✅ Next.js (App Router) + TypeScript
- ✅ Tailwind CSS (klare, moderne UI)
- ✅ Klickbare Körperkarte (SVG) + Filter nach Regionen
- ✅ Anatomie-Daten als JSON (Ursprung/Ansatz/Funktionen/Übungen/Tipps)
- ✅ Seiten für Trainingslehre, Ausdauerzonen & Verletzungen
- ✅ Saubere Struktur, leicht erweiterbar

## Los geht's

```bash
# Abhängigkeiten installieren
npm install

# Entwicklung
npm run dev

# Produktion
npm run build
npm start
```

## Projektstruktur

```
app/                # Next.js App Router Seiten
components/         # UI-Komponenten (BodyMap, Muskelkarten)
data/               # JSON-Daten (Muskeln, Prinzipien, Verletzungen...)
types/              # TypeScript-Typen
public/             # Assets
```

## Daten erweitern

**Anatomie**: `data/muscles.json`

```json
{
  "id": "latissimus-dorsi",
  "name": "M. latissimus dorsi",
  "group": "Rücken",
  "regions": ["ruecken"],
  "summary": "Kurzbeschreibung...",
  "origin": ["..."],
  "insertion": ["..."],
  "function": ["..."],
  "exercises": ["..."],
  "tips": ["..."]
}
```

- `regions`: eine oder mehrere aus `ruecken | brust | schultern | arme | bauch | glutes | quads | hamstrings | waaden`
- Ergänze sukzessive alle Muskeln aus deinem Skript.

**Trainingslehre**: `data/training_principles.json` – füge Prinzipien und Normative als Einträge hinzu.

**Ausdauer**: `data/endurance.json` – Zonen/Methoden/Intensitäten.

**Verletzungen**: `data/injuries.json` – Stichworte & Erstmaßnahmen.

## GitHub veröffentlichen

```bash
git init
git add .
git commit -m "feat: initial Trainerscript Explorer"
git branch -M main
git remote add origin https://github.com/<dein-user>/trainerscript-explorer.git
git push -u origin main
```

## Ideen/Nächste Schritte

- ✅ Seiten für Ernährung & Kommunikation (Module aus dem Skript)
- ✅ Detailseiten je Muskel (/anatomie/[id]) inkl. Variationen & Fehlerbildern
- ✅ ILB/SMART-Planung, Hfmax-Rechner, Karvonen-Tool
- ✅ Diagramme (Volumen/Intensität) via Recharts
- ✅ Dark Mode & PWA

Viel Spaß beim Ausbauen! 💪
