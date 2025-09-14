import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import ServiceWorker from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "TrainerScript Explorer",
  description: "Interaktive Übersicht über Anatomie, Trainingslehre, Verletzungen & mehr",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ServiceWorker />
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/70 backdrop-blur dark:bg-gray-900/70 dark:border-gray-700">
            <div className="container flex items-center justify-between py-3">
              <a href="/" className="font-semibold text-lg">🏋️ TrainerScript Explorer</a>
              <nav className="flex items-center gap-2">
                <a className="btn" href="/anatomie">Anatomie</a>
                <a className="btn" href="/trainingslehre">Trainingslehre</a>
                <a className="btn" href="/verletzungen">Verletzungen</a>
                <a className="btn" href="/hks">HKS</a>
                <a className="btn" href="/physiologie">Physiologie</a>
                <a className="btn" href="/tools">Tools</a>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="container py-8 flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
            <div className="container py-8 text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} TrainerScript Explorer – Demo-Inhalte.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
