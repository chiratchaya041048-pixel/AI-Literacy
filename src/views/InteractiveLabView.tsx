import React, { useState } from 'react';
import { 
  FlaskConical, 
  MessageSquare, 
  FileSearch, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Lightbulb,
  Check,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { LAB_PROMPT_CASES, LAB_FACT_CHECK_CASES, LAB_ETHICS_CASES } from '../data/labsData.ts';

interface InteractiveLabViewProps {
  onNavigate: (view: AppView) => void;
}

export const InteractiveLabView: React.FC<InteractiveLabViewProps> = ({ onNavigate }) => {
  const { progress, completeLab } = useLearning();

  const [activeTab, setActiveTab] = useState<'prompt' | 'factcheck' | 'ethics'>('prompt');

  // Prompt Challenge state
  const [currentPromptCaseIdx, setCurrentPromptCaseIdx] = useState(0);
  const [selectedPromptOptionId, setSelectedPromptOptionId] = useState<string | null>(null);
  const [promptSubmitted, setPromptSubmitted] = useState(false);

  // Fact Checker state
  const [currentFactCaseIdx, setCurrentFactCaseIdx] = useState(0);
  const [selectedFactOptionId, setSelectedFactOptionId] = useState<string | null>(null);
  const [factSubmitted, setFactSubmitted] = useState(false);

  // Ethics Lab state
  const [currentEthicsCaseIdx, setCurrentEthicsCaseIdx] = useState(0);
  const [selectedEthicsOptionId, setSelectedEthicsOptionId] = useState<string | null>(null);
  const [ethicsSubmitted, setEthicsSubmitted] = useState(false);

  const promptCase = LAB_PROMPT_CASES[currentPromptCaseIdx];
  const factCase = LAB_FACT_CHECK_CASES[currentFactCaseIdx];
  const ethicsCase = LAB_ETHICS_CASES[currentEthicsCaseIdx];

  // Submit Prompt Choice
  const handlePromptSubmit = () => {
    if (!selectedPromptOptionId) return;
    setPromptSubmitted(true);
    completeLab('promptChallenge');
    const selected = promptCase.options.find(o => o.id === selectedPromptOptionId);
    if (selected && selected.rating === 'great') {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const handleNextPromptCase = () => {
    if (currentPromptCaseIdx < LAB_PROMPT_CASES.length - 1) {
      setCurrentPromptCaseIdx(prev => prev + 1);
      setSelectedPromptOptionId(null);
      setPromptSubmitted(false);
    }
  };

  const handleResetPromptCase = () => {
    setSelectedPromptOptionId(null);
    setPromptSubmitted(false);
  };

  // Submit Fact Check Choice
  const handleFactSubmit = () => {
    if (!selectedFactOptionId) return;
    setFactSubmitted(true);
    completeLab('factChecker');
    const selected = factCase.options.find(o => o.id === selectedFactOptionId);
    if (selected && selected.isCorrect) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const handleNextFactCase = () => {
    if (currentFactCaseIdx < LAB_FACT_CHECK_CASES.length - 1) {
      setCurrentFactCaseIdx(prev => prev + 1);
      setSelectedFactOptionId(null);
      setFactSubmitted(false);
    }
  };

  // Submit Ethics Choice
  const handleEthicsSubmit = () => {
    if (!selectedEthicsOptionId) return;
    setEthicsSubmitted(true);
    completeLab('ethicsScenario');
    const selected = ethicsCase.options.find(o => o.id === selectedEthicsOptionId);
    if (selected && selected.isBestPractice) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  const handleNextEthicsCase = () => {
    if (currentEthicsCaseIdx < LAB_ETHICS_CASES.length - 1) {
      setCurrentEthicsCaseIdx(prev => prev + 1);
      setSelectedEthicsOptionId(null);
      setEthicsSubmitted(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#3478F6] text-xs font-semibold mb-3">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>ห้องทดลองการเรียนรู้เสมือนจริง</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt']">
              Interactive Learning Lab
            </h1>
            <p className="text-sm text-slate-600 mt-2 font-['Noto_Sans_Thai'] max-w-2xl leading-relaxed">
              ฝึกฝนทักษะการคิดวิเคราะห์ผ่านสถานการณ์จำลอง 3 กิจกรรมจริง: เขียน Prompt ให้คมชัด, จับผิด AI Hallucination, และตัดสินใจเชิงจริยธรรม
            </p>
          </div>

          {/* Badges for completed activities */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
            <span className="text-xs font-semibold text-slate-700 px-1">ความคืบหน้าแล็บ:</span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              progress.completedLabs.promptChallenge ? 'bg-purple-100 text-[#5B3FD6]' : 'bg-slate-200 text-slate-500'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Prompt
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              progress.completedLabs.factChecker ? 'bg-blue-100 text-[#3478F6]' : 'bg-slate-200 text-slate-500'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Fact-Check
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              progress.completedLabs.ethicsScenario ? 'bg-emerald-100 text-[#22A06B]' : 'bg-slate-200 text-slate-500'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Ethics
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
              activeTab === 'prompt'
                ? 'border-[#5B3FD6] bg-[#F1EDFF]/50 shadow-xs ring-2 ring-[#5B3FD6]/10'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                activeTab === 'prompt' ? 'bg-[#5B3FD6] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                A
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm font-['Prompt']">Prompt Challenge</p>
                <p className="text-xs text-slate-500">เลือกคำสั่งที่คมชัด</p>
              </div>
            </div>
            {progress.completedLabs.promptChallenge && <CheckCircle2 className="w-5 h-5 text-[#22A06B]" />}
          </button>

          <button
            onClick={() => setActiveTab('factcheck')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
              activeTab === 'factcheck'
                ? 'border-[#3478F6] bg-[#EAF3FF]/50 shadow-xs ring-2 ring-[#3478F6]/10'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                activeTab === 'factcheck' ? 'bg-[#3478F6] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                B
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm font-['Prompt']">Fact Checker</p>
                <p className="text-xs text-slate-500">ตรวจจับข้อมูลเท็จและ Hallucination</p>
              </div>
            </div>
            {progress.completedLabs.factChecker && <CheckCircle2 className="w-5 h-5 text-[#22A06B]" />}
          </button>

          <button
            onClick={() => setActiveTab('ethics')}
            className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
              activeTab === 'ethics'
                ? 'border-[#22A06B] bg-emerald-50/50 shadow-xs ring-2 ring-[#22A06B]/10'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                activeTab === 'ethics' ? 'bg-[#22A06B] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                C
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm font-['Prompt']">AI Ethics Scenario</p>
                <p className="text-xs text-slate-500">จำลองจริยธรรม & PDPA</p>
              </div>
            </div>
            {progress.completedLabs.ethicsScenario && <CheckCircle2 className="w-5 h-5 text-[#22A06B]" />}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ACTIVITY A: PROMPT CHALLENGE */}
      {/* ======================================================== */}
      {activeTab === 'prompt' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Scenario Overview Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5B3FD6] bg-[#F1EDFF] px-3 py-1 rounded-full uppercase">
                {promptCase.title}
              </span>
              <span className="text-xs text-slate-500">
                กรณีที่ {currentPromptCaseIdx + 1} จาก {LAB_PROMPT_CASES.length}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#172554] font-['Prompt']">
              สถานการณ์ที่ต้องแก้ปัญหา
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {promptCase.scenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                <span className="font-bold text-[#5B3FD6] block mb-0.5">🎯 เป้าหมาย (Goal):</span>
                <span>{promptCase.userGoal}</span>
              </div>
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <span className="font-bold text-[#3478F6] block mb-0.5">👥 กลุ่มเป้าหมาย (Audience):</span>
                <span>{promptCase.targetAudience}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>คำแนะนำสำหรับโจทย์นี้:</strong> {promptCase.proTip}</span>
            </div>
          </div>

          {/* Options to Choose */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-[#172554] font-['Prompt']">
              เลือกคำสั่ง (Prompt) ที่คุณคิดว่าเหมาะสมที่สุดสำหรับสถานการณ์นี้:
            </h3>

            <div className="space-y-3">
              {promptCase.options.map((option, idx) => {
                const isSelected = selectedPromptOptionId === option.id;
                
                let cardStyle = 'border-slate-200 hover:border-purple-300';
                if (promptSubmitted) {
                  if (option.rating === 'great') {
                    cardStyle = 'border-emerald-500 bg-emerald-50/40';
                  } else if (isSelected) {
                    cardStyle = 'border-amber-400 bg-amber-50/40';
                  } else {
                    cardStyle = 'border-slate-200 bg-slate-50 opacity-60';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-[#5B3FD6] bg-[#F1EDFF]/50 ring-2 ring-[#5B3FD6]/20';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => !promptSubmitted && setSelectedPromptOptionId(option.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#5B3FD6] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 space-y-2">
                        <p className="text-xs sm:text-sm text-slate-800 font-mono font-medium bg-white/80 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                          "{option.promptText}"
                        </p>

                        {/* Breakdown rubrics when submitted */}
                        {promptSubmitted && (
                          <div className="pt-2 space-y-2">
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              <span className={`px-2 py-0.5 rounded-full font-semibold ${
                                option.breakdown.hasPersona ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500 line-through'
                              }`}>
                                Persona (บทบาท)
                              </span>
                              <span className={`px-2 py-0.5 rounded-full font-semibold ${
                                option.breakdown.hasGoal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500 line-through'
                              }`}>
                                Goal (เป้าหมาย)
                              </span>
                              <span className={`px-2 py-0.5 rounded-full font-semibold ${
                                option.breakdown.hasContext ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500 line-through'
                              }`}>
                                Context (บริบท)
                              </span>
                              <span className={`px-2 py-0.5 rounded-full font-semibold ${
                                option.breakdown.hasOutputFormat ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500 line-through'
                              }`}>
                                Format (รูปแบบ)
                              </span>
                            </div>

                            <p className="text-xs text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                              <strong>การวิเคราะห์:</strong> {option.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
              {!promptSubmitted ? (
                <button
                  onClick={handlePromptSubmit}
                  disabled={!selectedPromptOptionId}
                  className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    selectedPromptOptionId
                      ? 'bg-[#5B3FD6] hover:bg-[#485FE6] text-white shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  ส่งคำตอบและวิเคราะห์โครงสร้าง Prompt
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleResetPromptCase}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ลองเลือกตัวเลือกอื่น</span>
                  </button>

                  {currentPromptCaseIdx < LAB_PROMPT_CASES.length - 1 ? (
                    <button
                      onClick={handleNextPromptCase}
                      className="px-5 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>โจทย์ถัดไป</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('factcheck')}
                      className="px-5 py-2.5 rounded-xl bg-[#3478F6] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>ไปทำกิจกรรม B: Fact Checker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ACTIVITY B: FACT CHECKER */}
      {/* ======================================================== */}
      {activeTab === 'factcheck' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3478F6] bg-[#EAF3FF] px-3 py-1 rounded-full uppercase">
                {factCase.title}
              </span>
              <span className="text-xs text-slate-500">
                กรณีที่ {currentFactCaseIdx + 1} จาก {LAB_FACT_CHECK_CASES.length}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                คำสั่งที่ผู้ใช้ส่งให้ AI:
              </p>
              <p className="text-sm font-medium text-slate-800">
                "{factCase.promptSent}"
              </p>
            </div>

            {/* AI Simulated Response with Hallucination Highlights */}
            <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>คำตอบที่ AI ส่งกลับมา (ตรวจพบจุดน่าสงสัย):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-['Noto_Sans_Thai'] leading-relaxed bg-white p-4 rounded-xl border border-rose-100">
                {factCase.aiResponse}
              </p>
            </div>

            {/* Critical Analysis breakdown */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-700">จุดที่ต้องจับผิดในคำตอบนี้ (AI Hallucination Analysis):</p>
              <div className="space-y-2">
                {factCase.criticalAnalysis.map((item, idx) => (
                  <div key={idx} className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-mono font-bold text-[11px]">
                        "{item.highlightText}"
                      </span>
                      <span className="text-rose-600 font-semibold text-[10px] uppercase">
                        [{item.issueType === 'hallucination' ? 'AI แต่งเรื่องขึ้นเอง' : 'ข้อมูลผิดพลาดร้ายแรง'}]
                      </span>
                    </div>
                    <p className="text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decision Question */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-[#172554] font-['Prompt']">
              {factCase.challengeQuestion}
            </h3>

            <div className="space-y-2.5">
              {factCase.options.map((opt) => {
                const isSelected = selectedFactOptionId === opt.id;
                
                let btnStyle = 'border-slate-200 hover:border-blue-300';
                if (factSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-[#3478F6] bg-[#EAF3FF] font-semibold';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => !factSubmitted && setSelectedFactOptionId(opt.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-xs sm:text-sm font-['Noto_Sans_Thai'] flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {opt.id.slice(-1).toUpperCase()}
                    </span>
                    <div className="flex-1 space-y-1">
                      <p>{opt.text}</p>
                      {factSubmitted && isSelected && (
                        <p className={`text-xs mt-2 pt-2 border-t border-current/20 ${opt.isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                          <strong>คำอธิบาย:</strong> {opt.feedback}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
              {!factSubmitted ? (
                <button
                  onClick={handleFactSubmit}
                  disabled={!selectedFactOptionId}
                  className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    selectedFactOptionId
                      ? 'bg-[#3478F6] hover:bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  ส่งการตัดสินใจตรวจสอบข้อเท็จจริง
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {currentFactCaseIdx < LAB_FACT_CHECK_CASES.length - 1 ? (
                    <button
                      onClick={handleNextFactCase}
                      className="px-5 py-2.5 rounded-xl bg-[#3478F6] hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>กรณีถัดไป</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('ethics')}
                      className="px-5 py-2.5 rounded-xl bg-[#22A06B] hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>ไปทำกิจกรรม C: AI Ethics</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ACTIVITY C: AI ETHICS SCENARIOS */}
      {/* ======================================================== */}
      {activeTab === 'ethics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#22A06B] bg-emerald-50 px-3 py-1 rounded-full uppercase">
                {ethicsCase.title}
              </span>
              <span className="text-xs text-slate-500">
                กรณีที่ {currentEthicsCaseIdx + 1} จาก {LAB_ETHICS_CASES.length}
              </span>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                สถานการณ์จำลองเชิงจริยธรรม:
              </p>
              <p className="text-sm sm:text-base text-slate-800 font-['Noto_Sans_Thai'] leading-relaxed">
                {ethicsCase.scenarioText}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">ผู้มีส่วนได้ส่วนเสีย (Stakeholders):</span>
              {ethicsCase.stakeholders.map((s, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-[#172554] font-['Prompt']">
              หากคุณตกอยู่ในสถานการณ์นี้ คุณจะเลือกดำเนินการอย่างไร?
            </h3>

            <div className="space-y-3">
              {ethicsCase.options.map((option) => {
                const isSelected = selectedEthicsOptionId === option.id;
                
                let cardStyle = 'border-slate-200 hover:border-emerald-300';
                if (ethicsSubmitted) {
                  if (option.isBestPractice) {
                    cardStyle = 'border-emerald-500 bg-emerald-50/50';
                  } else if (isSelected && !option.isBestPractice) {
                    cardStyle = 'border-rose-400 bg-rose-50/50';
                  } else {
                    cardStyle = 'border-slate-200 bg-slate-50 opacity-60';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-[#22A06B] bg-emerald-50/30 ring-2 ring-[#22A06B]/20';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => !ethicsSubmitted && setSelectedEthicsOptionId(option.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#22A06B] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {option.id.slice(-2).toUpperCase()}
                      </span>
                      <div className="flex-1 space-y-2">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 font-['Prompt']">
                          {option.actionText}
                        </p>

                        {/* Consequences & rules when submitted */}
                        {ethicsSubmitted && (
                          <div className="pt-2 space-y-2 border-t border-slate-200/80 text-xs font-['Noto_Sans_Thai']">
                            <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                              <p className="font-bold text-slate-700">ผลกระทบที่ตามมา (Downstream Consequences):</p>
                              <p className="text-slate-600 leading-relaxed">{option.consequences}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900">
                              <p className="font-bold">หลักการและมาตรฐานจริยธรรม:</p>
                              <p className="leading-relaxed">{option.ethicalRule}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
              {!ethicsSubmitted ? (
                <button
                  onClick={handleEthicsSubmit}
                  disabled={!selectedEthicsOptionId}
                  className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    selectedEthicsOptionId
                      ? 'bg-[#22A06B] hover:bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  ตัดสินใจและดูผลกระทบเชิงจริยธรรม
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {currentEthicsCaseIdx < LAB_ETHICS_CASES.length - 1 ? (
                    <button
                      onClick={handleNextEthicsCase}
                      className="px-5 py-2.5 rounded-xl bg-[#22A06B] hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>กรณีถัดไป</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="px-5 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>ทำกิจกรรมครบแล้ว! กลับหน้า Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
