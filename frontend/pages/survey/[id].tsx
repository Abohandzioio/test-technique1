import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  graphqlClient,
  GET_SURVEY_BY_ID,
  CREATE_RESPONSE,
} from "@/lib/graphql";
import EmojiRating from "@/components/EmojiRating";
import Toast from "@/components/Toast";
import ThemeToggle from "@/components/ThemeToggle";

// On définit les types pour éviter les erreurs "any"
interface Question {
  id: string;
  text: string;
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export default function SurveyPage() {
  const router = useRouter();
  const { id } = router.query;

  // États pour  les données, le chargement et les réponses
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // État pour les notifications Toast
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  useEffect(() => {
    if (!router.isReady || !id) return;

    async function loadSurvey() {
      try {
        const data = await graphqlClient.request<{ survey: Survey }>(
          GET_SURVEY_BY_ID,
          { id },
        );

        if (data && data.survey) {
          setSurvey(data.survey);

          // Récupération de la progression sauvegardée
          const saved = localStorage.getItem(`survey_draft_${id}`);
          if (saved) {
            try {
              const { answers: savedAnswers, index: savedIndex } = JSON.parse(saved);
              setAnswers(savedAnswers);
              setCurrentQuestionIndex(savedIndex);
              showNotification("Progression restaurée ! 💾", "info");
            } catch (e) {
              localStorage.removeItem(`survey_draft_${id}`);
            }
          }
        } else {
          console.error("Sondage introuvable");
        }
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    }

    loadSurvey();
  }, [id, router.isReady]);

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    if (id && Object.keys(answers).length > 0) {
      localStorage.setItem(`survey_draft_${id}`, JSON.stringify({
        answers,
        index: currentQuestionIndex
      }));
    }
  }, [answers, currentQuestionIndex, id]);

  const handleRatingChange = (questionId: string, rating: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: rating }));

    // Pass to next question after a brief delay for visual feedback
    if (survey && currentQuestionIndex < survey.questions.length - 1) {
      setTimeout(() => {
        setDirection('right');
        setCurrentQuestionIndex(prev => prev + 1);
      }, 400);
    }
  };

  // Fonction pour envoyer les réponses
  const handleSubmit = async () => {
    // Vérification : toutes les questions ont-elles une note ?
    if (!survey || Object.keys(answers).length < survey.questions.length) {
      showNotification("Oups ! Veuillez répondre à toutes les questions.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // On crée une promesse pour chaque réponse
      const mutationPromises = Object.entries(answers).map(
        ([questionId, rating]) =>
          graphqlClient.request(CREATE_RESPONSE, {
            questionId,
            rating,
            userName: "Anonyme",
          }),
      );

      await Promise.all(mutationPromises);

      // Nettoyage de la sauvegarde locale après succès
      localStorage.removeItem(`survey_draft_${id}`);

      showNotification("Parfait ! Vos réponses sont enregistrées.", "success");

      // On attend un peu que l'utilisateur voit le toast de succès avant de rediriger
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      showNotification("Désolé, une erreur technique est survenue.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-indigo-500/10 rounded"></div>
        </div>
      </div>
    );

  if (!survey)
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="glass-card p-10 rounded-3xl text-center">
          <p className="text-xl font-bold mb-6">Sondage introuvable</p>
          <Link href="/" className="text-indigo-500 font-bold hover:underline">
            Réessayer plus tard
          </Link>
        </div>
      </div>
    );

  const currentQuestion = survey.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1;

  return (
    <main className="min-h-screen mesh-gradient selection:bg-indigo-500/30 py-20 px-6 transition-colors duration-500">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group animate-in fade-in slide-in-from-top-4 duration-700">
            <img src="/logo.svg" alt="Logo" className="w-10 h-10 group-hover:scale-110 transition-transform" />
            <h1 className="text-xl font-black tracking-tighter">Mü être</h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-3xl mx-auto pt-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4 font-bold uppercase tracking-widest text-[10px] opacity-40">
            <span>Question {currentQuestionIndex + 1} sur {survey.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-indigo-500/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation back */}
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-3 opacity-40 hover:opacity-100 transition-colors font-bold uppercase tracking-widest text-[10px] group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quitter</span>
          </Link>

          {(Object.keys(answers).length > 0 || currentQuestionIndex > 0) && (
            <button
              onClick={() => {
                if (confirm("Voulez-vous vraiment recommencer ce sondage ?")) {
                  localStorage.removeItem(`survey_draft_${id}`);
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                  showNotification("Sondage réinitialisé", "info");
                }
              }}
              className="text-[10px] font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity"
            >
              Reprendre de zéro
            </button>
          )}
        </div>

        {/* Header content */}
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter mb-4">{survey.title}</h1>
        </div>

        {/* Current Question Display */}
        <div className="relative min-h-[400px]">
          <div
            key={currentQuestion.id}
            className={`animate-in fade-in duration-500 ${direction === 'right' ? 'slide-in-from-right-8' : 'slide-in-from-left-8'}`}
          >
            <div className="glass-card p-10 md:p-14 rounded-[2.5rem] hover:border-indigo-500/20 transition-colors">
              <p className="text-3xl font-bold tracking-tight mb-12 leading-tight">
                {currentQuestion.text}
              </p>

              <EmojiRating
                value={answers[currentQuestion.id]}
                disabled={isSubmitting}
                onChange={(rating: number) => handleRatingChange(currentQuestion.id, rating)}
              />
            </div>
          </div>

          <div className="mt-12 flex justify-between items-center px-4">
            <button
              onClick={() => {
                setDirection('left');
                setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentQuestionIndex === 0 || isSubmitting}
              className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 disabled:opacity-0 transition-opacity flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Précédent</span>
            </button>

            {(isLastQuestion && answers[currentQuestion.id]) && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  ai-button px-10 py-5 rounded-2xl font-black text-lg tracking-tighter shadow-2xl ai-shadow
                  ${isSubmitting ? 'opacity-50 grayscale' : 'hover:scale-105 active:scale-95 animate-in zoom-in-95 duration-300'}
                `}
              >
                {isSubmitting ? "Envoi..." : "Confirmer"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Background patterns */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-indigo-500/5 blur-[150px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-purple-500/5 blur-[150px] -z-10 pointer-events-none"></div>
    </main>
  );
}
