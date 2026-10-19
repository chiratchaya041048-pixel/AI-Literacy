import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  Check, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { MODULES_DATA } from '../data/modulesData.ts';

interface LessonDetailViewProps {
  moduleId: number;
  onNavigate: (view: AppView, targetModuleId?: number) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({ moduleId, onNavigate }) => {
  const { progress, completeModule, setCurrentModuleId } = useLearning();

  const moduleItem = MODULES_DATA.find(m => m.id === moduleId) || MODULES_DATA[0];
  const isCompleted = progress.completedModules.includes(moduleItem.id);

  // Checkpoint Quiz interactive state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Reset checkpoint state and scroll to top only when switching module
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setCurrentModuleId(moduleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId]);

  const handleMarkCompleted = () => {
    completeModule(moduleItem.id);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleCheckpointSubmit = () => {
    if (selectedAnswer !== null) {
      setIsAnswerSubmitted(true);
    }
  };

  const prevModule = MODULES_DATA.find(m => m.id === moduleItem.id - 1);
  const nextModule = MODULES_DATA.find(m => m.id === moduleItem.id + 1);

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-16">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('modules')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปหน้ารวมบทเรียน</span>
        </button>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>เรียนจบโมดูลนี้แล้ว</span>
            </span>
          ) : (
            <button
              onClick={handleMarkCompleted}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#22A06B] hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>ทำเครื่องหมายว่าเรียนจบแล้ว</span>
            </button>
          )}
        </div>
      </div>

      {/* Module Title Header Card */}
      <div className="bg-linear-to-r from-[#172554] via-[#5B3FD6] to-[#3478F6] rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              โมดูลที่ {moduleItem.moduleNumber} / 6
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-900/40 text-xs font-medium border border-white/20">
              {moduleItem.bdiPillar}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-purple-200">
              <Clock className="w-3.5 h-3.5" /> {moduleItem.durationMinutes} นาที
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Prompt'] leading-tight">
            {moduleItem.title}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 font-medium">
            {moduleItem.titleEn}
          </p>

          <p className="text-sm sm:text-base text-purple-100 font-['Noto_Sans_Thai'] leading-relaxed pt-2">
            {moduleItem.summary}
          </p>
        </div>
      </div>

      {/* Objectives Box */}
      <div className="bg-[#F1EDFF]/50 border border-purple-200 rounded-2xl p-5 sm:p-6">
        <h3 className="font-bold text-[#5B3FD6] text-sm sm:text-base font-['Prompt'] mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#5B3FD6]" />
          <span>จุดประสงค์การเรียนรู้ประจำโมดูลนี้:</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai']">
          {moduleItem.objectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-[#5B3FD6] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                {idx + 1}
              </span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Structured Content Sections */}
      <div className="space-y-8">
        {moduleItem.sections.map((section, idx) => (
          <article 
            key={section.id} 
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#172554] font-['Prompt'] pb-3 border-b border-slate-100">
              {section.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed">
              {section.body.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Bullet points if any */}
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">ประเด็นสำคัญ:</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai']">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="flex items-start gap-2">
                      <span className="text-[#5B3FD6] font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Life Example Box */}
            {section.lifeExample && (
              <div className="bg-[#EAF3FF] border border-blue-200 rounded-2xl p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3478F6] uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>{section.lifeExample.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed">
                  {section.lifeExample.description}
                </p>
              </div>
            )}

            {/* Key Takeaway Callout */}
            {section.keyTakeaway && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    สิ่งสำคัญที่ควรรู้ (Key Takeaway)
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-900 mt-1 font-['Noto_Sans_Thai']">
                    {section.keyTakeaway}
                  </p>
                </div>
              </div>
            )}

            {/* Caution Callout */}
            {section.caution && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    ข้อควรระวัง (Caution)
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 mt-1 font-['Noto_Sans_Thai'] leading-relaxed">
                    {section.caution}
                  </p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Interactive Knowledge Checkpoint Question (คำถามทบทวนความเข้าใจระหว่างเรียน) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-indigo-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#5B3FD6] text-white flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#172554] text-lg font-['Prompt']">
              คำถามทบทวนความเข้าใจระหว่างเรียน
            </h3>
            <p className="text-xs text-slate-500">ทดสอบความเข้าใจสั้น ๆ 1 ข้อก่อนก้าวสู่บทถัดไป</p>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm sm:text-base font-semibold text-slate-800 font-['Prompt']">
          {moduleItem.checkpoint.question}
        </div>

        <div className="space-y-2.5">
          {moduleItem.checkpoint.options.map((opt, optIdx) => {
            const isSelected = selectedAnswer === optIdx;
            const isCorrect = optIdx === moduleItem.checkpoint.correctIndex;
            
            let btnStyle = 'border-slate-200 bg-white hover:border-slate-300';
            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
              } else {
                btnStyle = 'border-slate-200 bg-slate-50 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'border-[#5B3FD6] bg-[#F1EDFF] text-[#5B3FD6] font-semibold';
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswerSubmitted}
                onClick={() => setSelectedAnswer(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-['Noto_Sans_Thai'] transition-all flex items-start gap-3 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Checkpoint Feedback & Submit Button */}
        {!isAnswerSubmitted ? (
          <button
            onClick={handleCheckpointSubmit}
            disabled={selectedAnswer === null}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              selectedAnswer !== null
                ? 'bg-[#5B3FD6] hover:bg-[#485FE6] text-white shadow-xs'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            ตรวจคำตอบ
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              {selectedAnswer === moduleItem.checkpoint.correctIndex ? (
                <span className="text-emerald-700 font-bold text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> ตอบถูกต้อง!
                </span>
              ) : (
                <span className="text-rose-700 font-bold text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-5 h-5 text-rose-600" /> ยังไม่ถูกต้อง ลองอ่านคำอธิบายด้านล่าง
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed">
              <strong>คำอธิบาย:</strong> {moduleItem.checkpoint.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Module Summary & Completion */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6">
        <h3 className="text-xl font-bold font-['Prompt'] flex items-center gap-2 text-white">
          <BookOpen className="w-5 h-5 text-[#3478F6]" />
          <span>สรุปสิ่งสำคัญที่ได้เรียนรู้ในโมดูลที่ {moduleItem.moduleNumber}</span>
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-['Noto_Sans_Thai']">
          {moduleItem.keyTakeawaysList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Mark as completed bar */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            {isCompleted ? 'คุณได้บันทึกความสำเร็จโมดูลนี้แล้ว' : 'อ่านจบแล้วกดปุ่มเพื่อบันทึกความก้าวหน้า'}
          </p>
          <button
            onClick={handleMarkCompleted}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-[#5B3FD6] hover:bg-[#485FE6] text-white shadow-md'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'เรียนจบแล้ว (บันทึกเรียบร้อย)' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Paging (Prev / Next Module) */}
      <div className="flex items-center justify-between gap-4 pt-4">
        {prevModule ? (
          <button
            onClick={() => onNavigate('module-detail', prevModule.id)}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>โมดูลก่อนหน้า: {prevModule.title}</span>
          </button>
        ) : <div />}

        {nextModule ? (
          <button
            onClick={() => onNavigate('module-detail', nextModule.id)}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white font-semibold text-xs sm:text-sm transition-all shadow-md"
          >
            <span>โมดูลถัดไป: {nextModule.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigate('lab')}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl bg-[#22A06B] hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-all shadow-md"
          >
            <span>ไปทำกิจกรรมใน AI Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Reference Citation Footer */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>เนื้อหาอ้างอิงและพัฒนาตามกรอบ: สถาบันข้อมูลขนาดใหญ่ (BDI)</span>
        <a
          href="https://bdi.or.th/big-data-101/ai-literacy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5B3FD6] hover:underline flex items-center gap-1 font-medium"
        >
          <span>https://bdi.or.th/big-data-101/ai-literacy/</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
