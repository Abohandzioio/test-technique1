import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // TODO: Récupérer les sondages depuis l'API
    // Exemple de code à compléter :
    const fetchSurveys = async () => {
      try {
        setLoading(true);
        // const data = await graphqlClient.request(GET_SURVEYS);
        // setSurveys(data.surveys);

        // TEMPORAIRE : Données de test pour démarrer
        setSurveys([
          {
            id: "1",
            title: "Sondage bien-être quotidien",
            description: "Quelques questions pour évaluer votre bien-être",
            questions: [
              { id: "1", text: "Question 1" },
              { id: "2", text: "Question 2" },
            ],
          },
        ]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🌟 Sondages Bien-être
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <p className="text-gray-600 mb-6">
            Bienvenue ! Sélectionnez un sondage pour commencer.
          </p>

          {/* Liste des sondages */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <div
                key={survey.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {survey.title}
                </h2>
                <p className="text-gray-600 mb-4">{survey.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {survey.questions.length} question(s)
                </p>
                <Link
                  href={`/survey/${survey.id}`}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Répondre →
                </Link>
              </div>
            ))}
          </div>

          {/* Lien vers les résultats */}
          <div className="mt-8">
            <Link href="/results" className="text-primary hover:underline">
              Voir les résultats globaux →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
