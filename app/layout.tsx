import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrainerScript Explorer",
  description: "Interaktive Übersicht über Anatomie, Trainingslehre, Verletzungen & mehr",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
            <div className="container flex items-center justify-between py-3">
              <a href="/" className="font-semibold text-lg">🏋️ TrainerScript Explorer</a>
              <nav className="flex items-center gap-2">
                <a className="btn" href="/anatomie">Anatomie</a>
                <a className="btn" href="/trainingslehre">Trainingslehre</a>
                <a className="btn" href="/verletzungen">Verletzungen</a>
                <a className="btn" href="/hks">HKS</a>
                <a className="btn" href="/physiologie">Physiologie</a>
              </nav>
            </div>
          </header>
          <main className="container py-8">{children}</main>
          <footer className="border-t mt-12">
            <div className="container py-8 text-sm text-gray-500">
              © {new Date().getFullYear()} TrainerScript Explorer – Demo-Inhalte.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
