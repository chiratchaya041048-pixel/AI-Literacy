import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Check, 
  AlertCircle,
  Eye,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { PRE_TEST_QUESTIONS, POST_TEST_QUESTIONS } from '../data/questionsData.ts';
import { QuizQuestion, QuizResult } from '../types/index.ts';

interface QuizViewProps {
  testType: 'pre' | 'post';
  onNavigate: (view: AppView, moduleId?: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ testType, onNavigate }) => {
  const { progress, recordQuizResult } = useLearning();

  const isPre = testType === 'pre';
  const questionsList: QuizQuestion[] = isPre ? PRE_TEST_QUESTIONS : POST_TEST_QUESTIONS;

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const currentQ = questionsList[currentQuestionIndex];
  const totalQuestions = questionsList.length;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowReviewModal(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowReviewModal(false);

    // Calculate score
    let correct = 0;
    questionsList.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });

    const score = Math.round((correct / totalQuestions) * 100);

    const result: QuizResult = {
      id: `${testType}-${Date.now()}`,
      testType,
      score,
      correctCount: correct,
      totalQuestions,
      timestamp: new Date().toISOString(),
      answers: userAnswers
    };

    setQuizResult(result);
    setIsSubmitted(true);
    recordQuizResult(result);

    try {
      confetti({
        particleCount: score >= 70 ? 80 : 40,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setQuizResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับหน้า Dashboard</span>
        </button>

        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          isPre ? 'bg-[#F1EDFF] text-[#5B3FD6]' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {isPre ? 'แบบทดสอบก่อนเรียน (Pre-test)' : 'แบบทดสอบหลังเรียน (Post-test)'}
        </span>
      </div>

      {/* ======================================================== */}
      {/* ACTIVE QUIZ SCREEN (NOT SUBMITTED YET) */}
      {/* ======================================================== */}
      {!isSubmitted ? (
        <div className="space-y-6">
          
          {/* Progress & Stepper Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-slate-800 font-['Prompt']">
                คำถามข้อที่ {currentQuestionIndex + 1} จาก {totalQuestions}
              </span>
              <span className="text-slate-500 font-medium">
                ตอบแล้ว {answeredCount} จาก {totalQuestions} ข้อ
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-linear-to-r from-[#5B3FD6] to-[#3478F6] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Numbers Pager */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {questionsList.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-[#5B3FD6] text-white ring-2 ring-[#5B3FD6]/30 shadow-xs'
                        : isAnswered
                        ? 'bg-purple-100 text-[#5B3FD6]'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#5B3FD6] bg-[#F1EDFF] px-2.5 py-1 rounded-md">
                หมวด: {currentQ.categoryName} ({currentQ.bdiDomain})
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-[#172554] font-['Prompt'] leading-snug pt-1">
                {currentQ.question}
              </h2>
            </div>

            {/* 4 Choices */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3 sm:gap-4 ${
                      isSelected
                        ? 'border-[#5B3FD6] bg-[#F1EDFF]/50 ring-2 ring-[#5B3FD6]/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-[#5B3FD6] text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-base text-slate-800 font-['Noto_Sans_Thai'] leading-relaxed pt-0.5">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Nav controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ข้อก่อนหน้า</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">ตรวจทานคำตอบ</span>
                </button>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>ข้อถัดไป</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-6 py-2.5 rounded-xl bg-[#22A06B] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>สรุปและส่งคำตอบ</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* RESULTS & EXPLANATIONS SCREEN */
        /* ======================================================== */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Score Header Banner */}
          <div className="bg-linear-to-r from-[#172554] via-[#5B3FD6] to-[#3478F6] text-white rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-white shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
              {isPre ? 'ผลการประเมินความรู้ก่อนเรียน' : 'ผลการประเมินความรู้หลังเรียน'}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-['Prompt']">
              คะแนนของคุณ: {quizResult?.score} / 100 คะแนน
            </h1>

            <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto font-['Noto_Sans_Thai']">
              ตอบถูกต้อง {quizResult?.correctCount} จาก {totalQuestions} ข้อ
              {quizResult && quizResult.score >= 80 ? (
                ' — ยอดเยี่ยมมาก! คุณมีความเข้าใจในเรื่อง AI Literacy อยู่ในระดับสูง'
              ) : quizResult && quizResult.score >= 50 ? (
                ' — ทำได้ดี! มีความเข้าใจพื้นฐานที่ดี และสามารถเรียนรู้ต่อยอดในโมดูลต่าง ๆ ได้อย่างมีประสิทธิภาพ'
              ) : (
                ' — เริ่มต้นได้ดี! เรียนรู้เนื้อหาทั้ง 6 โมดูลเพื่อเสริมความเข้าใจให้รอบด้านยิ่งขึ้น'
              )}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-xl bg-white text-[#5B3FD6] font-bold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all"
              >
                ไปที่หน้า Dashboard
              </button>
              <button
                onClick={() => onNavigate('analytics')}
                className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20"
              >
                ดูวิเคราะห์ผลการเรียน
              </button>
              <button
                onClick={handleRetry}
                className="px-4 py-3 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 text-white text-xs sm:text-sm flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ทำแบบทดสอบอีกครั้ง</span>
              </button>
            </div>
          </div>

          {/* Answer Key & Full Detailed Explanations */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-[#172554] font-['Prompt']">
                  เฉลยและคำอธิบายอย่างละเอียดทุกข้อ (Answer Key & Rationales)
                </h3>
                <p className="text-xs text-slate-500 font-['Noto_Sans_Thai']">
                  ศึกษาเหตุผลและที่มาเพื่อความเข้าใจที่ถูกต้องตามกรอบ BDI
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {questionsList.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border-2 space-y-4 ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-[#22A06B] text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            {q.categoryName} • {q.bdiDomain}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm sm:text-base font-['Prompt']">
                            {q.question}
                          </h4>
                        </div>
                      </div>

                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> ถูกต้อง
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-rose-800 bg-rose-100 shrink-0">
                          <XCircle className="w-4 h-4" /> ตอบผิด
                        </span>
                      )}
                    </div>

                    {/* Choices Display */}
                    <div className="space-y-2 text-xs sm:text-sm pl-10 font-['Noto_Sans_Thai']">
                      {q.options.map((opt, optIdx) => {
                        const isThisChoiceUser = userChoice === optIdx;
                        const isThisChoiceCorrect = q.correctIndex === optIdx;

                        let optBadge = 'border-slate-200 bg-white text-slate-600';
                        if (isThisChoiceCorrect) {
                          optBadge = 'border-emerald-500 bg-emerald-100/70 text-emerald-900 font-semibold';
                        } else if (isThisChoiceUser && !isThisChoiceCorrect) {
                          optBadge = 'border-rose-400 bg-rose-100/70 text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${optBadge}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </div>
                            {isThisChoiceCorrect && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                                คำตอบที่ถูกต้อง
                              </span>
                            )}
                            {isThisChoiceUser && !isThisChoiceCorrect && (
                              <span className="text-[10px] font-bold text-rose-700 bg-rose-200 px-2 py-0.5 rounded-full shrink-0">
                                คุณเลือกข้อนี้
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed pl-4 border-l-4 border-l-[#5B3FD6]">
                      <strong className="text-[#5B3FD6] block mb-1">คำอธิบายเหตุผล:</strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* REVIEW & SUBMIT MODAL */}
      {/* ======================================================== */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F1EDFF] text-[#5B3FD6] flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#172554] text-lg font-['Prompt']">
                  สรุปการตอบก่อนส่งคำตอบ
                </h3>
                <p className="text-xs text-slate-500">
                  ตอบแล้ว {answeredCount} จากทั้งหมด {totalQuestions} ข้อ
                </p>
              </div>
            </div>

            {answeredCount < totalQuestions && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>คุณยังมีข้อที่ยังไม่ได้ตอบอีก {totalQuestions - answeredCount} ข้อ คุณต้องการตรวจทานก่อนส่งหรือไม่?</span>
              </div>
            )}

            <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
              {questionsList.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setShowReviewModal(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                      isAnswered
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    ข้อ {idx + 1}
                    <span className="block text-[10px] font-normal">
                      {isAnswered ? 'ตอบแล้ว' : 'เว้นว่าง'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                กลับไปตรวจทาน
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white text-xs font-bold shadow-md"
              >
                ยืนยันส่งคำตอบ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
