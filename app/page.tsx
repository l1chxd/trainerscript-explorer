import Link from "next/link";
import { Dumbbell, HeartPulse, BookOpenCheck, Activity, AlertTriangle, Brain } from "lucide-react";

const sections = [
  { href: "/anatomie", title: "Anatomie", icon: "Dumbbell", desc: "Klicke dich durch Körperregionen & Muskeln" },
  { href: "/trainingslehre", title: "Trainingslehre", icon: "BookOpenCheck", desc: "Prinzipien, Methoden & Belastungsnormative" },
  { href: "/hks", title: "Herz-Kreislauf-System", icon: "HeartPulse", desc: "HKS, Gefäße, Blutdruck & Formeln" },
  { href: "/physiologie", title: "Physiologie", icon: "Brain", desc: "Zellen, Gewebe, Nerven, Hormone, Faszien" },
  { href: "/verletzungen", title: "Verletzungen & Erste Hilfe", icon: "AlertTriangle", desc: "PECH-Regel, typische Verletzungen" },
  { href: "/ausdauer", title: "Ausdauer-Methoden", icon: "Activity", desc: "Zonen, Methoden & Ziele" },
];

const icons = { Dumbbell, HeartPulse, BookOpenCheck, Activity, AlertTriangle, Brain };

export default function Page() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">TrainerScript Explorer</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Interaktive Übersicht über Anatomie, Trainingslehre, Ausdauer, HKS, Physiologie und Verletzungen. Klicke eine Kachel oder nutze die Navigation.</p>
      </section>

      <section className="grid-cards">
        {sections.map((s) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <Link key={s.href} href={s.href} className="card p-6 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <Icon />
                <h2 className="text-xl font-semibold">{s.title}</h2>
              </div>
              <p className="text-gray-600">{s.desc}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
