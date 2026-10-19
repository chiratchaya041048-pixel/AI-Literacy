import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  FlaskConical, 
  BarChart3, 
  Lock, 
  Unlock, 
  Play, 
  RotateCcw, 
  Clock, 
  HelpCircle,
  Award
} from 'lucide-react';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { MODULES_DATA } from '../data/modulesData.ts';
import { PERSONAS_DATA } from '../data/personasData.ts';

interface DashboardViewProps {
  onNavigate: (view: AppView, moduleId?: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { progress, progressPercentage, isPostTestUnlocked } = useLearning();

  const currentPersona = PERSONAS_DATA.find(p => p.id === progress.persona) || PERSONAS_DATA[0];
  const completedCount = progress.completedModules.length;

  // Determine current/next module to continue
  const currentModule = MODULES_DATA.find(m => m.id === progress.currentModuleId) || MODULES_DATA[0];
  
  // Recommend next uncompleted module
  const nextUncompletedModule = MODULES_DATA.find(m => !progress.completedModules.includes(m.id)) || MODULES_DATA[5];

  // Lab progress
  const completedLabCount = Object.values(progress.completedLabs).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#172554] via-[#5B3FD6] to-[#3478F6] text-white p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ยินดีต้อนรับกลับมา, <strong>{progress.nickname}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              <span className="text-purple-200">{currentPersona.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Prompt'] tracking-tight">
              ภาพรวมการเรียนรู้ AI Literacy
            </h1>
            <p className="text-sm sm:text-base text-purple-100 max-w-2xl font-['Noto_Sans_Thai']">
              มุ่งสู่การเป็นผู้ใช้งานเทคโนโลยี AI อย่างรอบรู้ มีวิจารณญาณ และมีความรับผิดชอบ
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('module-detail', currentModule.id)}
              className="px-5 py-3 rounded-xl bg-white text-[#5B3FD6] font-bold text-sm shadow-md hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-[#5B3FD6]" />
              <span>เรียนต่อ: โมดูล {currentModule.id}</span>
            </button>
            <button
              onClick={() => onNavigate('modules')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition-all text-center"
            >
              ดูทุกบทเรียน
            </button>
          </div>
        </div>

        {/* Big Progress Bar in Banner */}
        <div className="mt-8 pt-6 border-t border-white/15">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2 text-purple-100">
            <span>ความก้าวหน้ารวมทั้งหลักสูตร</span>
            <span className="text-white font-bold text-base">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5">
            <div 
              className="bg-linear-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-purple-200 mt-2">
            <span>บทเรียนเสร็จสิ้น: {completedCount} / 6 โมดูล</span>
            <span>แล็บจำลอง: {completedLabCount} / 3 กิจกรรม</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Pre-test score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>คะแนนก่อนเรียน (Pre-test)</span>
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </div>
            {progress.preTestScore !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#172554] font-['Prompt']">
                  {progress.preTestScore}
                </span>
                <span className="text-xs text-slate-500">/ 100 คะแนน</span>
              </div>
            ) : (
              <div>
                <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                  ยังไม่ได้ทำแบบทดสอบ
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => onNavigate('pre-test')}
            className="mt-4 text-xs font-semibold text-[#5B3FD6] hover:text-[#3478F6] flex items-center gap-1 transition-colors"
          >
            <span>{progress.preTestScore !== null ? 'ดูผลและเฉลย Pre-test' : 'เริ่มทำแบบทดสอบก่อนเรียน'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Completed Modules */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>บทเรียนที่เรียนจบแล้ว</span>
              <BookOpen className="w-4 h-4 text-[#5B3FD6]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#5B3FD6] font-['Prompt']">
                {completedCount}
              </span>
              <span className="text-xs text-slate-500">/ 6 โมดูล</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#5B3FD6] h-full rounded-full transition-all duration-500" 
              style={{ width: `${(completedCount / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Card 3: Interactive Lab */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>ห้องทดลอง AI Lab</span>
              <FlaskConical className="w-4 h-4 text-[#3478F6]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#3478F6] font-['Prompt']">
                {completedLabCount}
              </span>
              <span className="text-xs text-slate-500">/ 3 กิจกรรม</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('lab')}
            className="mt-4 text-xs font-semibold text-[#3478F6] hover:underline flex items-center gap-1"
          >
            <span>เข้าสู่ห้องทดลองจำลอง</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Post-test Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>แบบทดสอบหลังเรียน (Post-test)</span>
              {isPostTestUnlocked ? (
                <Unlock className="w-4 h-4 text-[#22A06B]" />
              ) : (
                <Lock className="w-4 h-4 text-slate-400" />
              )}
            </div>
            {progress.postTestScore !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#22A06B] font-['Prompt']">
                  {progress.postTestScore}
                </span>
                <span className="text-xs text-slate-500">/ 100 คะแนน</span>
              </div>
            ) : (
              <span className={`text-xs font-semibold px-2 py-1 rounded inline-block ${
                isPostTestUnlocked ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {isPostTestUnlocked ? 'ปลดล็อกพร้อมทำแล้ว' : 'ยังไม่ปลดล็อก'}
              </span>
            )}
          </div>
          <button
            onClick={() => onNavigate('post-test')}
            disabled={!isPostTestUnlocked && progress.postTestScore === null}
            className={`mt-4 text-xs font-semibold flex items-center gap-1 transition-colors ${
              isPostTestUnlocked || progress.postTestScore !== null
                ? 'text-[#22A06B] hover:text-emerald-700'
                : 'text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{progress.postTestScore !== null ? 'ดูผลและประเมินผล' : isPostTestUnlocked ? 'ทำแบบทดสอบวัดผล' : 'เรียนให้ครบตามเงื่อนไขเพื่อปลดล็อก'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Active Learning & Recommended Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Current / Recommended Module & Lab shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* In-progress / Continue Learning Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#5B3FD6] bg-[#F1EDFF] px-3 py-1 rounded-full uppercase tracking-wider">
                บทเรียนที่คุณกำลังเรียน
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>ประมาณ {currentModule.durationMinutes} นาที</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-[#5B3FD6] to-[#3478F6] text-white flex items-center justify-center font-bold text-lg font-['Prompt'] shrink-0 shadow-md">
                {currentModule.id}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#172554] font-['Prompt']">
                  {currentModule.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {currentModule.titleEn}
                </p>
                <p className="text-sm text-slate-600 mt-2 font-['Noto_Sans_Thai'] leading-relaxed">
                  {currentModule.summary}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">เสาหลัก BDI:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                  {currentModule.bdiPillar}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('module-detail', currentModule.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>เข้าสู่บทเรียนนี้</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Lab Highlight Banner */}
          <div className="bg-linear-to-br from-[#EAF3FF] to-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#3478F6] text-xs font-bold mb-2">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Interactive Learning Lab</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#172554] font-['Prompt']">
                  ฝึกทักษะผ่านสถานการณ์จำลองจริง 3 กิจกรรม
                </h3>
              </div>
              <button
                onClick={() => onNavigate('lab')}
                className="px-4 py-2 rounded-xl bg-[#3478F6] hover:bg-blue-600 text-white text-xs font-semibold transition-colors flex items-center gap-1 shrink-0"
              >
                <span>เปิดห้องทดลอง</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div 
                onClick={() => onNavigate('lab')}
                className="p-3.5 rounded-xl bg-white border border-blue-100 hover:border-[#3478F6] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">A. Prompt Challenge</span>
                  {progress.completedLabs.promptChallenge && <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  ฝึกจัดโครงสร้างคำสั่ง P-G-C-F ให้ AI ตอบคมชัด
                </p>
              </div>

              <div 
                onClick={() => onNavigate('lab')}
                className="p-3.5 rounded-xl bg-white border border-blue-100 hover:border-[#3478F6] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">B. Fact Checker</span>
                  {progress.completedLabs.factChecker && <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  จับผิด AI Hallucination และตรวจข้อมูลสุขภาพ/กฎหมาย
                </p>
              </div>

              <div 
                onClick={() => onNavigate('lab')}
                className="p-3.5 rounded-xl bg-white border border-blue-100 hover:border-[#3478F6] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">C. AI Ethics</span>
                  {progress.completedLabs.ethicsScenario && <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  จำลองการตัดสินใจเรื่องข้อมูลส่วนบุคคลและลิขสิทธิ์
                </p>
              </div>
            </div>
          </div>

          {/* Quick Review Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#172554] text-base font-['Prompt']">
                ต้องการทบทวนเนื้อหาบทเรียนที่ผ่านมา?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                คุณสามารถเปิดอ่านซ้ำและทำข้อสอบทบทวนความเข้าใจกี่ครั้งก็ได้โดยไม่มีจำกัด
              </p>
            </div>
            <button
              onClick={() => onNavigate('modules')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ทบทวนบทเรียน</span>
            </button>
          </div>

        </div>

        {/* Right Column: Next Steps & Post-test Unlock Condition */}
        <div className="space-y-6">
          
          {/* Post-Test Card */}
          <div className={`rounded-3xl p-6 border transition-all ${
            isPostTestUnlocked 
              ? 'bg-linear-to-b from-emerald-50 to-white border-emerald-300 shadow-sm' 
              : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                isPostTestUnlocked ? 'bg-emerald-100 text-[#22A06B]' : 'bg-slate-100 text-slate-500'
              }`}>
                {isPostTestUnlocked ? 'พร้อมทำการประเมินผล' : 'เงื่อนไขการปลดล็อก'}
              </span>
              {isPostTestUnlocked ? (
                <Unlock className="w-5 h-5 text-[#22A06B]" />
              ) : (
                <Lock className="w-5 h-5 text-slate-400" />
              )}
            </div>

            <h3 className="text-lg font-bold text-[#172554] font-['Prompt'] mb-2">
              แบบทดสอบหลังเรียน (Post-test)
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-['Noto_Sans_Thai'] leading-relaxed">
              แบบทดสอบ 10 ข้อเพื่อวัดความเข้าใจ เปรียบเทียบคะแนนก่อนและหลังเรียน และรับเกียรติบัตรความฉลาดรู้ด้าน AI
            </p>

            {/* Checklist of unlock conditions */}
            <div className="space-y-2 mb-5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${completedCount >= 6 ? 'text-[#22A06B]' : 'text-slate-300'}`} />
                <span className={completedCount >= 6 ? 'font-medium text-slate-800' : ''}>
                  เรียนจบทั้ง 6 โมดูล ({completedCount}/6)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${completedLabCount >= 1 ? 'text-[#22A06B]' : 'text-slate-300'}`} />
                <span className={completedLabCount >= 1 ? 'font-medium text-slate-800' : ''}>
                  ทำกิจกรรมใน AI Lab อย่างน้อย 1 กิจกรรม ({completedLabCount}/3)
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('post-test')}
              disabled={!isPostTestUnlocked && progress.postTestScore === null}
              className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isPostTestUnlocked || progress.postTestScore !== null
                  ? 'bg-[#22A06B] hover:bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{progress.postTestScore !== null ? 'ดูผลการทดสอบและเกียรติบัตร' : 'ทำแบบทดสอบหลังเรียน'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Persona Card Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              เส้นทางการเรียนรู้ของคุณ
            </h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F1EDFF] text-[#5B3FD6] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">{currentPersona.label}</p>
                <p className="text-xs text-[#5B3FD6] font-semibold">{currentPersona.badge}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-['Noto_Sans_Thai'] mb-4">
              {currentPersona.recommendedFocus}
            </p>
            <button
              onClick={() => onNavigate('settings')}
              className="w-full py-2 text-center text-xs font-semibold text-[#5B3FD6] bg-[#F1EDFF] hover:bg-purple-100 rounded-xl transition-colors"
            >
              เปลี่ยนเส้นทางหรือแก้ไขชื่อ
            </button>
          </div>

          {/* Analytics Shortcut */}
          <div 
            onClick={() => onNavigate('analytics')}
            className="bg-linear-to-br from-[#F1EDFF]/50 to-white rounded-3xl p-5 border border-purple-200 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5B3FD6] text-white flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">การวิเคราะห์ผลการเรียน</p>
                <p className="text-xs text-slate-500">เปรียบเทียบคะแนนและจุดแข็ง</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#5B3FD6]" />
          </div>

        </div>

      </div>

    </div>
  );
};
