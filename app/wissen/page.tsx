import type { Metadata } from "next";
import Link from "next/link";
import { getWikiList } from "@/lib/wiki";

export const metadata: Metadata = {
  title: "Wissen",
  description: "Schneller Überblick über alle Markdown-Wissensartikel.",
};

export default async function WissenIndexPage() {
  const articles = await getWikiList();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Wissen</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Alle verfügbaren Wissensartikel aus dem Markdown-Ordner.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Noch keine Inhalte vorhanden.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug.join("/")}>
              <Link
                className="card block p-4 transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                href={`/wissen/${article.slug.join("/")}`}
              >
                <span className="font-medium text-lg">{article.title}</span>
                <span className="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  Weiterlesen
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
