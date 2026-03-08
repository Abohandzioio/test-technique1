"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { graphqlClient, GET_SURVEY_WITH_RESULTS } from "@/lib/graphql";
import ThemeToggle from "@/components/ThemeToggle";

interface Question {
    id: string;
    text: string;
    responses: { rating: number }[];
}

interface Survey {
    title: string;
    questions: Question[];
}

export default function ResultDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [survey, setSurvey] = useState<Survey | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady || !id) return;
        async function loadData() {
            try {
                const data = await graphqlClient.request<{ survey: Survey }>(GET_SURVEY_WITH_RESULTS, { id });
                setSurvey(data.survey);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id, router.isReady]);

    if (loading) return (
        <div className="min-h-screen mesh-gradient flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
    );

    if (!survey) return null;

    return (
        <div className="min-h-screen mesh-gradient selection:bg-indigo-500/30 transition-colors duration-500 py-20 px-6">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass-morphism px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 md:space-x-3 group animate-in fade-in slide-in-from-top-4 duration-700">
                        <img src="/logo.svg" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
                        <h1 className="text-lg md:text-xl font-black tracking-tighter">Mü être</h1>
                    </Link>
                    <nav className="flex items-center space-x-6">
                        <Link href="/results" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all px-4 py-2 rounded-lg hover:bg-white/5">
                            Tous les résultats
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </header>

            <div className="max-w-5xl mx-auto pt-10">
                <div className="mb-20">
                    <Link
                        href="/results"
                        className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-colors mb-8 group"
                    >
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Retour</span>
                    </Link>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">{survey.title}</h1>
                    <p className="opacity-50 text-xl max-w-2xl leading-relaxed">
                        Analyse détaillée des ressentis collectés. Chaque réponse nous aide à construire un meilleur environnement.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                    {[
                        { label: "Réponses Total", val: survey.questions[0]?.responses.length || 0, color: "from-blue-500 to-indigo-500" },
                        {
                            label: "Moyenne Générale", val: (survey.questions.reduce((acc, q) => {
                                const qAvg = q.responses.length ? q.responses.reduce((sum, r) => sum + r.rating, 0) / q.responses.length : 0;
                                return acc + qAvg;
                            }, 0) / survey.questions.length).toFixed(1) + "/5", color: "from-indigo-500 to-purple-500"
                        },
                        { label: "Participation", val: "89%", color: "from-purple-500 to-pink-500" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{stat.label}</p>
                            <p className="text-3xl md:text-4xl font-black tracking-tighter">{stat.val}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-6 md:space-y-8">
                    {survey.questions.map((q, index) => {
                        const avg = q.responses.length
                            ? (q.responses.reduce((acc, r) => acc + r.rating, 0) / q.responses.length).toFixed(1)
                            : 0;
                        const percentage = (Number(avg) / 5) * 100;

                        return (
                            <div key={q.id} className="glass-card p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden transition-all duration-300 hover:border-indigo-500/20">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-10">
                                    <div className="max-w-2xl">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <span className="text-lg md:text-xl font-black opacity-10">{String(index + 1).padStart(2, '0')}</span>
                                            <div className="w-8 h-px bg-indigo-500/20"></div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{q.text}</h3>
                                        <p className="text-[10px] opacity-40 font-bold uppercase tracking-[0.2em]">
                                            {q.responses.length} retours enregistrés
                                        </p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <span className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-500">
                                            {avg}
                                        </span>
                                        <span className="text-lg md:text-xl font-bold opacity-20 ml-2">/ 5</span>
                                    </div>
                                </div>

                                <div className="space-y-6 mt-10">
                                    <div className="relative h-4 bg-indigo-500/5 rounded-full overflow-hidden border border-white/5 p-1">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                            style={{ width: `${percentage}%` }}
                                        >
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-5 gap-2 md:gap-4">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            const count = q.responses.filter(r => r.rating === star).length;
                                            const starPercentage = q.responses.length ? (count / q.responses.length) * 100 : 0;
                                            return (
                                                <div key={star} className="flex flex-col items-center">
                                                    <div className="w-full h-12 md:h-20 bg-indigo-500/5 rounded-lg relative overflow-hidden group/bar">
                                                        <div
                                                            className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-indigo-500/40 to-purple-500/20 transition-all duration-1000 delay-300 ease-out`}
                                                            style={{ height: `${starPercentage}%` }}
                                                        ></div>
                                                        <div className="absolute inset-0 flex items-center justify-center text-[8px] md:text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                                            {count}
                                                        </div>
                                                    </div>
                                                    <span className="mt-2 text-[8px] md:text-[10px] font-bold opacity-30">{star}★</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-widest opacity-20">
                                    <span>Critique</span>
                                    <span className="text-indigo-500/40">Positif</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
