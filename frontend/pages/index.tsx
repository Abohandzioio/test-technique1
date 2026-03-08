import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// Interface TypeScript pour les données
interface Question {
  id: string;
  text: string;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function Home() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              surveys {
                id
                title
                description
                questions {
                  id
                  text
                }
              }
            }
          `,
        }),
      });

      const data = await res.json();
      setSurveys(data.data.surveys);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xl font-medium tracking-widest uppercase opacity-50">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient selection:bg-indigo-500/30 transition-colors duration-500">
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group animate-in fade-in slide-in-from-top-4 duration-700">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
            <h1 className="text-lg md:text-2xl font-black tracking-tighter">
              Mü être
            </h1>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/results"
              className="text-sm font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-all flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <span>Résultats</span>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none">
              Prenez soin du <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">bien-être</span><br />
              de vos équipes.
            </h2>
            <p className="text-lg opacity-60 max-w-2xl mb-10 leading-relaxed">
              Collectez des retours authentiques et améliorez l'ambiance au quotidien grâce à nos sondages simples et rapides.
            </p>
          </div>

          {/* Liste des sondages */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative h-full glass-card p-8 rounded-3xl flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
                  <div>
                    <div className="mb-6 flex justify-between items-start">
                      <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                        📋
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                      {survey.title}
                    </h2>
                    <p className="opacity-40 text-sm leading-relaxed mb-6 line-clamp-2">
                      {survey.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto space-x-4">
                    <span className="text-[10px] font-bold opacity-20 whitespace-nowrap uppercase tracking-widest">
                      {survey.questions.length} Questions
                    </span>
                    <Link
                      href={`/survey/${survey.id}`}
                      className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl font-bold text-sm ai-shadow hover:bg-indigo-600 transition-all flex items-center justify-center min-w-[120px]"
                    >
                      Répondre
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-12 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center font-bold">
              ⚠️ {error}
            </div>
          )}
        </div>
      </main>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-20">
        <div className="h-[20vh] bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
      </div>
    </div>
  );
}
