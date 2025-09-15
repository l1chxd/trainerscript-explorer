import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import musclesData from "@/data/muscles.json";
import type { Muscle } from "@/types";

const muscles = musclesData as Muscle[];

export function generateStaticParams() {
  return muscles.map((muscle) => ({
    id: muscle.id,
  }));
}

type MusclePageProps = {
  params: {
    id: string;
  };
};

export default function MuscleDetailPage({ params }: MusclePageProps): ReactElement {
  const muscle = muscles.find((m) => m.id === params.id);

  if (!muscle) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <header className="card p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">{muscle.name}</h1>
          <span className="badge text-base">{muscle.group}</span>
        </div>
        <p className="text-gray-600 leading-relaxed">{muscle.summary}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="card p-6 space-y-3">
          <h2 className="text-xl font-semibold">Ursprung</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {muscle.origin.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card p-6 space-y-3">
          <h2 className="text-xl font-semibold">Ansatz</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {muscle.insertion.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="card p-6 space-y-3 md:col-span-2">
          <h2 className="text-xl font-semibold">Funktion</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {muscle.function.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        {muscle.exercises?.length ? (
          <div className="card p-6 space-y-3">
            <h2 className="text-xl font-semibold">Übungen</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {muscle.exercises.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {muscle.tips?.length ? (
          <div className="card p-6 space-y-3">
            <h2 className="text-xl font-semibold">Tipps</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {muscle.tips.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
