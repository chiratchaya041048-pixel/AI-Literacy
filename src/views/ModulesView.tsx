import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  BookOpen, 
  Layers, 
  MessageSquare, 
  Palette, 
  ShieldCheck, 
  Cpu, 
  Sparkles 
} from 'lucide-react';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { MODULES_DATA } from '../data/modulesData.ts';

interface ModulesViewProps {
  onNavigate: (view: AppView, moduleId?: number) => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({ onNavigate }) => {
  const { progress } = useLearning();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getPillarIcon = (pillar: string) => {
    switch (pillar) {
      case 'Engage with AI': return MessageSquare;
      case 'Create with AI': return Palette;
      case 'Manage AI': return ShieldCheck;
      case 'Design AI': return Layers;
      default: return Cpu;
    }
  };

  const filteredModules = selectedFilter === 'all'
    ? MODULES_DATA
    : MODULES_DATA.filter(m => m.bdiPillar.toLowerCase().includes(selectedFilter.toLowerCase()));

  const completedCount = progress.completedModules.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EDFF] text-[#5B3FD6] text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>หลักสูตรความฉลาดรู้ด้าน AI (6 โมดูล)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt']">
            เส้นทางการเรียนรู้ (Learning Path)
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-['Noto_Sans_Thai'] max-w-2xl leading-relaxed">
            ครอบคลุมตั้งแต่ความเข้าใจพื้นฐาน เทคนิคการสื่อสารและสั่งการ การร่วมสร้างสรรค์ การกำกับดูแลความถูกต้องและความปลอดภัย จนถึงการคิดเชิงออกแบบตามกรอบของสถาบันข้อมูลขนาดใหญ่ (BDI)
          </p>
        </div>

        {/* Completion Counter Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-[#5B3FD6] to-[#3478F6] text-white flex items-center justify-center font-bold text-lg font-['Prompt']">
            {completedCount}/6
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">สำเร็จแล้ว</p>
            <p className="text-base font-bold text-slate-800">
              {completedCount === 6 ? 'จบหลักสูตรครบถ้วน 🎉' : `${completedCount} จาก 6 โมดูล`}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'ทั้งหมด (6 โมดูล)' },
          { id: 'foundations', label: 'พื้นฐาน AI' },
          { id: 'engage', label: 'Engage with AI' },
          { id: 'create', label: 'Create with AI' },
          { id: 'manage', label: 'Manage AI' },
          { id: 'design', label: 'Design AI' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedFilter === filter.id
                ? 'bg-[#5B3FD6] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map((moduleItem) => {
          const isCompleted = progress.completedModules.includes(moduleItem.id);
          const isCurrent = progress.currentModuleId === moduleItem.id;
          const PillarIcon = getPillarIcon(moduleItem.bdiPillar);

          return (
            <div
              key={moduleItem.id}
              className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border transition-all duration-200 ${
                isCompleted
                  ? 'border-emerald-200 bg-linear-to-r from-emerald-50/20 via-white to-white'
                  : isCurrent
                  ? 'border-[#5B3FD6] ring-2 ring-[#5B3FD6]/10 shadow-md'
                  : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Left: Module Number & Info */}
                <div className="flex items-start gap-4 sm:gap-5 flex-1">
                  
                  {/* Number Badge */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl font-['Prompt'] shrink-0 shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-linear-to-tr from-[#5B3FD6] to-[#3478F6] text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : moduleItem.moduleNumber}
                  </div>

                  <div className="space-y-2">
                    {/* Meta tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1EDFF] text-[#5B3FD6]">
                        <PillarIcon className="w-3 h-3" />
                        <span>{moduleItem.bdiPillar}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{moduleItem.durationMinutes} นาที</span>
                      </span>

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> เรียนจบแล้ว
                        </span>
                      )}
                      {!isCompleted && isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" /> กำลังเรียน
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#172554] font-['Prompt']">
                      โมดูลที่ {moduleItem.moduleNumber}: {moduleItem.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium -mt-1">
                      {moduleItem.titleEn}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 font-['Noto_Sans_Thai'] leading-relaxed pt-1">
                      {moduleItem.summary}
                    </p>

                    {/* Key Objectives Bullet preview */}
                    <div className="pt-2">
                      <p className="text-xs font-semibold text-slate-700 mb-1">สิ่งที่คุณจะได้เรียนรู้:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-500">
                        {moduleItem.objectives.slice(0, 2).map((obj, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-[#5B3FD6] font-bold">•</span>
                            <span className="truncate">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex sm:flex-col items-center justify-end gap-2 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <button
                    onClick={() => onNavigate('module-detail', moduleItem.id)}
                    className={`w-full sm:w-44 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs ${
                      isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        : isCurrent
                        ? 'bg-[#5B3FD6] hover:bg-[#485FE6] text-white shadow-purple-500/25'
                        : 'bg-[#172554] hover:bg-[#20326e] text-white'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        <span>ทบทวนเนื้อหา</span>
                      </>
                    ) : isCurrent ? (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>เรียนต่อ</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>เริ่มต้นเรียน</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
