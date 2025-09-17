import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWikiArticle, getWikiSlugs, getWikiTitle } from "@/lib/wiki";

type WikiPageProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams() {
  const slugs = await getWikiSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WikiPageProps): Promise<Metadata> {
  const title = await getWikiTitle(params.slug);
  if (!title) {
    return {
      title: "Wissensartikel",
    };
  }

  return {
    title,
  };
}

export default async function WikiArticlePage({ params }: WikiPageProps) {
  const article = await getWikiArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <Link className="text-sm text-blue-600 hover:underline dark:text-blue-400" href="/wissen">
          ← Zurück zur Übersicht
        </Link>
        <h1 className="text-3xl font-semibold">{article.title}</h1>
      </div>
      <div
        className="space-y-4 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul>li]:marker:text-blue-500"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
    </article>
  );
}
