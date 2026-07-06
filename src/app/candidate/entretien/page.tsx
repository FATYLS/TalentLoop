"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mic, MicOff, Volume2, Send, ChevronRight, CheckCircle2,
  AlertCircle, Star, Loader2,
} from "lucide-react";
import { getApplications, Application } from "@/lib/candidate-store";
import { getInterviewQuestions, evaluateAnswer, InterviewFeedback } from "@/lib/ai-simulator";
import Link from "next/link";

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export default function EntretienPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const apps = getApplications();
    setApplications(apps);
    if (apps.length > 0) setSelectedApp(apps[0]);
  }, []);

  const questions = selectedApp ? getInterviewQuestions(selectedApp.job) : [];
  const currentQuestion = questions[questionIndex];

  const speakQuestion = useCallback(() => {
    if (!currentQuestion || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion]);

  const startListening = () => {
    if (typeof window === "undefined" || !window.webkitSpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée sur ce navigateur. Utilisez Chrome.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from({ length: event.results.length })
        .map((_, i) => event.results[i][0].transcript)
        .join("");
      setAnswer(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedApp || !currentQuestion || !answer.trim()) return;
    setEvaluating(true);
    await new Promise(r => setTimeout(r, 1200));
    const result = evaluateAnswer(selectedApp.job, currentQuestion.text, answer);
    setFeedback(result);
    setEvaluating(false);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setAnswer("");
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  if (applications.length === 0) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <Mic className="w-16 h-16 text-[#BF00FF]/30 mx-auto" />
        <h1 className="text-2xl font-black text-black mt-6">Simulateur d&apos;entretien IA</h1>
        <p className="text-gray-500 mt-3">Postulez d&apos;abord à une offre pour lancer un entretien personnalisé.</p>
        <Link href="/candidate/recherche"
          className="inline-flex items-center gap-2 mt-8 bg-[#BF00FF] text-white font-bold px-6 py-3 rounded-full">
          Voir les offres <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-black">Simulateur d&apos;entretien IA</h1>
        <p className="text-gray-500 mt-1 text-sm">Entraînez-vous avec des questions ciblées — audio intégré (TTS + micro).</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <label className="text-xs font-semibold text-gray-500">Offre sélectionnée</label>
        <div className="grid sm:grid-cols-2 gap-2 mt-2">
          {applications.map(app => (
            <button key={app.id} onClick={() => { setSelectedApp(app); setQuestionIndex(0); setAnswer(""); setFeedback(null); }}
              className={`text-left p-3 rounded-xl border-2 text-sm transition-all ${
                selectedApp?.id === app.id ? "border-[#BF00FF] bg-[#BF00FF]/5" : "border-gray-100 hover:border-gray-200"
              }`}>
              <p className="font-bold text-black">{app.job.title}</p>
              <p className="text-xs text-[#BF00FF]">{app.job.company} · {app.job.city}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedApp && currentQuestion && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-bold text-[#BF00FF]">Question {questionIndex + 1}/{questions.length}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
              <div className="h-full bg-[#BF00FF] rounded-full transition-all"
                style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#BF00FF] to-[#14B8A6] flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#BF00FF] uppercase tracking-widest mb-2">Recruteur IA — {selectedApp.job.company}</p>
                <p className="text-lg font-semibold text-black leading-relaxed">{currentQuestion.text}</p>
                <button onClick={speakQuestion} disabled={isSpeaking}
                  className="mt-4 flex items-center gap-2 text-sm font-bold text-[#BF00FF] border border-[#BF00FF]/30 px-4 py-2 rounded-full hover:bg-[#BF00FF]/5 disabled:opacity-50">
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-pulse" : ""}`} />
                  {isSpeaking ? "Lecture en cours..." : "Écouter la question"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="text-xs font-semibold text-gray-500">Votre réponse</label>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)}
              placeholder="Tapez ou dictez votre réponse..."
              rows={5}
              className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BF00FF] resize-none" />

            <div className="flex flex-wrap gap-3 mt-4">
              {!isListening ? (
                <button onClick={startListening}
                  className="flex items-center gap-2 bg-black text-white font-bold px-5 py-2.5 rounded-full hover:bg-gray-800">
                  <Mic className="w-4 h-4" /> Répondre au micro
                </button>
              ) : (
                <button onClick={stopListening}
                  className="flex items-center gap-2 bg-red-500 text-white font-bold px-5 py-2.5 rounded-full animate-pulse">
                  <MicOff className="w-4 h-4" /> Arrêter l&apos;écoute
                </button>
              )}
              <button onClick={handleSubmitAnswer} disabled={!answer.trim() || evaluating}
                className="flex items-center gap-2 bg-gradient-to-r from-[#BF00FF] to-[#14B8A6] text-white font-bold px-5 py-2.5 rounded-full disabled:opacity-40">
                {evaluating ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyse...</> : <><Send className="w-4 h-4" /> Envoyer la réponse</>}
              </button>
            </div>
          </div>

          {feedback && (
            <div className="bg-white rounded-2xl border-2 border-[#BF00FF]/20 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#BF00FF]/10 flex items-center justify-center">
                  <span className="text-2xl font-black text-[#BF00FF]">{feedback.score}</span>
                </div>
                <div>
                  <p className="font-black text-black text-lg">Score : {feedback.score}/100</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= Math.round(feedback.score / 20) ? "fill-[#BF00FF] text-[#BF00FF]" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{feedback.summary}</p>
                </div>
              </div>

              {feedback.strengths.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Points forts</p>
                  {feedback.strengths.map(s => (
                    <p key={s} className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {s}
                    </p>
                  ))}
                </div>
              )}

              {feedback.improvements.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">Axes d&apos;amélioration</p>
                  {feedback.improvements.map(s => (
                    <p key={s} className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                      <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /> {s}
                    </p>
                  ))}
                </div>
              )}

              {questionIndex < questions.length - 1 ? (
                <button onClick={nextQuestion}
                  className="w-full flex items-center justify-center gap-2 bg-[#BF00FF] text-white font-bold py-3 rounded-xl">
                  Question suivante <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-center py-4 bg-green-50 rounded-xl">
                  <p className="font-black text-green-800">Entretien terminé !</p>
                  <p className="text-sm text-green-600 mt-1">Vous êtes prêt(e) pour le vrai entretien chez {selectedApp.job.company}.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
