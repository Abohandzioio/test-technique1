"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: { id: string }[];
}

export default function Results() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const res = await fetch("http://localhost:3000/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                surveys {
                  id
                  title
                  description
                  questions { id }
                }
              }
            `,
          }),
        });
        const data = await res.json();
        setSurveys(data.data.surveys);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurveys();
  }, []);

  if (loading) return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen mesh-gradient selection:bg-indigo-500/30 transition-colors duration-500 px-6 py-20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <img src="/logo.svg" alt="Mü être" className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
            <h1 className="text-lg md:text-xl font-black tracking-tighter">Mü être</h1>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-colors">Accueil</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto pt-10 md:pt-16">
        <div className="mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Tableau de bord</h1>
          <p className="opacity-50 text-lg md:text-xl max-w-2xl">
            Retrouvez ici l'ensemble des retours collectés pour améliorer le quotidien de vos équipes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {surveys.map((survey) => (
            <div key={survey.id} className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative glass-card p-8 rounded-3xl flex flex-col h-full hover:translate-y-[-4px] transition-all duration-300">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl mb-6 font-inter">📊</div>
                  <h2 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">{survey.title}</h2>
                  <p className="opacity-40 text-sm line-clamp-2 mb-6 leading-relaxed">{survey.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-bold opacity-20 uppercase tracking-widest">
                    {survey.questions.length} Indicateurs
                  </span>
                  <Link
                    href={`/results/${survey.id}`}
                    className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl font-bold text-sm ai-shadow hover:bg-indigo-600 transition-all"
                  >
                    Voir l'analyse
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
