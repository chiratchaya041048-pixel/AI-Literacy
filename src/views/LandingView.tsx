import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Palette, 
  ShieldCheck, 
  Layers, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Compass, 
  BookOpen, 
  BrainCircuit, 
  Cpu, 
  Users,
  Award
} from 'lucide-react';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { PERSONAS_DATA } from '../data/personasData.ts';
import { LearningPersona } from '../types/index.ts';

interface LandingViewProps {
  onNavigate: (view: AppView, moduleId?: number) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const { progress, setPersona, progressPercentage } = useLearning();

  const handleSelectPersona = (personaId: LearningPersona) => {
    setPersona(personaId);
  };

  const getPersonaIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'Briefcase': return Briefcase;
      case 'Home': return Home;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#172554] via-[#5B3FD6] to-[#3478F6] text-white p-6 sm:p-12 lg:p-16 shadow-xl">
        {/* Background circuit lines decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium mb-6">
            <BrainCircuit className="w-4 h-4 text-purple-200" />
            <span>ตามกรอบความฉลาดรู้ด้านปัญญาประดิษฐ์ BDI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-300 font-semibold">เรียนรู้ฟรีทันที</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Prompt'] leading-tight mb-4">
            AI Literacy
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple-200 mt-2">
              รู้ทัน AI ใช้เป็น คิดอย่างรับผิดชอบ
            </span>
          </h1>

          <p className="text-base sm:text-lg text-purple-100/90 font-['Noto_Sans_Thai'] mb-4 leading-relaxed">
            <strong>เข้าใจ AI ใช้เทคโนโลยีอย่างฉลาด:</strong> เรียนรู้เกี่ยวกับ AI เข้าใจขีดความสามารถและข้อจำกัด ใช้งานอย่างมีประสิทธิภาพ ประเมินความน่าเชื่อถือของข้อมูล และร่วมสร้างสรรค์ผลงานอย่างปลอดภัย มีจริยธรรม และมีความรับผิดชอบ
          </p>

          <p className="text-xs sm:text-sm text-purple-200/80 mb-8 font-light italic">
            "Learn AI. Think Critically. Use Responsibly." — ออกแบบสำหรับประชาชนทุกช่วงวัย ไม่จำเป็นต้องมีพื้นฐานการเขียนโปรแกรม
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3.5 rounded-xl bg-white text-[#5B3FD6] font-bold text-sm sm:text-base shadow-lg hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>{progressPercentage > 0 ? 'เรียนต่อในหน้าหลัก' : 'เริ่มต้นเรียนรู้'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('pre-test')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>{progress.preTestScore !== null ? `ผลทดสอบก่อนเรียน (${progress.preTestScore}%)` : 'ทำแบบทดสอบก่อนเรียน (Pre-test)'}</span>
            </button>
          </div>

          {/* Value points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/15 text-xs text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>6 โมดูลเนื้อหาเข้มข้น</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Interactive AI Lab จำลอง</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>บันทึกความก้าวหน้าอัตโนมัติ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 2: Choose Learning Persona (เลือกประสบการณ์การเรียนรู้) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#3478F6] text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>ปรับแต่งประสบการณ์ของคุณ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt']">
            เลือกเส้นทางการเรียนรู้ที่เหมาะกับคุณ
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-['Noto_Sans_Thai']">
            เลือกบทบาทที่คุณสนใจเพื่อปรับคำแนะนำ ตัวอย่างสถานการณ์ และจุดเน้นให้ตรงกับคุณมากที่สุด (คุณยังคงเข้าถึงและเรียนได้ทุกบทเรียนอย่างอิสระ)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAS_DATA.map((persona) => {
            const Icon = getPersonaIcon(persona.iconName);
            const isSelected = progress.persona === persona.id;

            return (
              <div
                key={persona.id}
                onClick={() => handleSelectPersona(persona.id)}
                className={`relative rounded-2xl p-5 border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#5B3FD6] bg-[#F1EDFF]/50 shadow-md ring-2 ring-[#5B3FD6]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#5B3FD6] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#5B3FD6] text-white">
                        กำลังเลือก
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-[#172554] text-base font-['Prompt'] mb-1">
                    {persona.label}
                  </h3>
                  <p className="text-xs text-[#5B3FD6] font-semibold mb-2">
                    {persona.badge}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-['Noto_Sans_Thai']">
                    {persona.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 block mb-0.5">จุดเน้นที่แนะนำ:</span>
                  <span className="line-clamp-2">{persona.recommendedFocus}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-800">เส้นทางปัจจุบัน: </span>
            {PERSONAS_DATA.find(p => p.id === progress.persona)?.badge} — สามารถสลับบทบาทได้ตลอดเวลาที่หน้าตั้งค่า
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#5B3FD6] text-white text-xs sm:text-sm font-semibold hover:bg-[#485FE6] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>เริ่มตามเส้นทางแนะนำ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4 Core Pillars of BDI Framework */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EDFF] text-[#5B3FD6] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>กรอบการเรียนรู้ 4 องค์ประกอบ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt']">
            4 เสาหลักความฉลาดรู้ด้าน AI (BDI Framework)
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-['Noto_Sans_Thai']">
            สถาบันข้อมูลขนาดใหญ่ (BDI) ได้วางรากฐานทักษะ AI สำหรับประชาชน 4 มิติเพื่อการใช้ชีวิตและการทำงานในยุคปัญญาประดิษฐ์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Engage */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F1EDFF] text-[#5B3FD6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#5B3FD6] tracking-wider uppercase">01 / สื่อสาร</span>
              <h3 className="text-lg font-bold text-[#172554] font-['Prompt'] mt-1 mb-2">
                Engage with AI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-['Noto_Sans_Thai']">
                การมีส่วนร่วมและสื่อสารกับ AI อย่างมีเป้าหมาย รู้วิธีเขียน Prompt ที่มีประสิทธิภาพ ให้บริบท และถามต่อเพื่อขัดเกลาคำตอบ
              </p>
            </div>
            <button
              onClick={() => onNavigate('module-detail', 3)}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#5B3FD6] flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>เรียนโมดูลที่ 3</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Create */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EAF3FF] text-[#3478F6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#3478F6] tracking-wider uppercase">02 / สร้างสรรค์</span>
              <h3 className="text-lg font-bold text-[#172554] font-['Prompt'] mt-1 mb-2">
                Create with AI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-['Noto_Sans_Thai']">
                การร่วมสร้างสรรค์ผลงาน ขยายจินตนาการ เขียนข้อความ สร้างภาพ สรุปงาน พร้อมความตระหนักรู้เรื่องลิขสิทธิ์และความโปร่งใส
              </p>
            </div>
            <button
              onClick={() => onNavigate('module-detail', 4)}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#3478F6] flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>เรียนโมดูลที่ 4</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: Manage */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#22A06B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#22A06B] tracking-wider uppercase">03 / กำกับดูแล</span>
              <h3 className="text-lg font-bold text-[#172554] font-['Prompt'] mt-1 mb-2">
                Manage AI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-['Noto_Sans_Thai']">
                การกำกับดูแล ตรวจสอบข้อเท็จจริง (Fact-check) ป้องกันข้อมูลรั่วไหลตาม PDPA รู้ทันอคติ และยึดหลัก Human-in-the-loop
              </p>
            </div>
            <button
              onClick={() => onNavigate('module-detail', 5)}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#22A06B] flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>เรียนโมดูลที่ 5</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 4: Design */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F5A623] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#F5A623] tracking-wider uppercase">04 / ออกแบบ</span>
              <h3 className="text-lg font-bold text-[#172554] font-['Prompt'] mt-1 mb-2">
                Design AI
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-['Noto_Sans_Thai']">
                เข้าใจระบบ Input-Process-Output การเลือกใช้ AI แก้ปัญหาจริงในชีวิต และการประเมินผลกระทบต่อสังคมและสิ่งแวดล้อม
              </p>
            </div>
            <button
              onClick={() => onNavigate('module-detail', 6)}
              className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-[#F5A623] flex items-center gap-1 hover:gap-2 transition-all"
            >
              <span>เรียนโมดูลที่ 6</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Curriculum Summary Overview */}
      <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172554] font-['Prompt']">
              เนื้อหาหลักสูตรทั้ง 6 โมดูลการเรียนรู้
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-['Noto_Sans_Thai']">
              เนื้อหาเรียบเรียงเป็นภาษาง่าย พร้อมตัวอย่างในชีวิตจริง กล่องข้อควรระวัง และแบบทดสอบทบทวน
            </p>
          </div>
          <button
            onClick={() => onNavigate('modules')}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-[#5B3FD6] hover:bg-[#F1EDFF] transition-colors flex items-center gap-1 shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>ดูรายละเอียดหลักสูตรทั้งหมด</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { num: 1, title: 'รู้จัก AI และ AI Literacy', tag: 'พื้นฐานสำคัญ', time: '12 นาที' },
            { num: 2, title: 'เข้าใจความสามารถและข้อจำกัดของ AI', tag: 'รู้ทัน Hallucination', time: '14 นาที' },
            { num: 3, title: 'Engage: โต้ตอบและเขียน Prompt', tag: 'สูตรสำเร็จ P-G-C-F', time: '15 นาที' },
            { num: 4, title: 'Create: สร้างสรรค์ร่วมกับ AI', tag: 'ลิขสิทธิ์และความโปร่งใส', time: '13 นาที' },
            { num: 5, title: 'Manage: กำกับดูแล ตรวจสอบ และ PDPA', tag: 'Fact-checking & Ethics', time: '16 นาที' },
            { num: 6, title: 'Design: เข้าใจและออกแบบแก้ปัญหา', tag: 'Input-Output & Impact', time: '15 นาที' }
          ].map((m) => (
            <div 
              key={m.num}
              onClick={() => onNavigate('module-detail', m.num)}
              className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-[#5B3FD6] hover:shadow-xs cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#F1EDFF] text-[#5B3FD6] font-bold text-xs flex items-center justify-center shrink-0">
                  {m.num}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#5B3FD6] transition-colors">
                    {m.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-500">{m.time}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {m.tag}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#5B3FD6] group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-linear-to-r from-[#5B3FD6] to-[#3478F6] text-white p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-md">
        <h3 className="text-2xl sm:text-3xl font-bold font-['Prompt']">
          พร้อมเริ่มต้นพัฒนาความฉลาดรู้ด้าน AI ของคุณแล้วหรือยัง?
        </h3>
        <p className="text-purple-100 text-sm max-w-xl mx-auto font-['Noto_Sans_Thai']">
          ทดสอบความรู้พื้นฐานด้วยแบบทดสอบก่อนเรียน หรือเข้าสู่บทเรียนแรกเพื่อทำความเข้าใจปัญญาประดิษฐ์ไปด้วยกัน
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => onNavigate('pre-test')}
            className="px-6 py-3 rounded-xl bg-white text-[#5B3FD6] font-bold text-sm hover:bg-slate-100 transition-all shadow-md"
          >
            ทำแบบทดสอบก่อนเรียน (10 ข้อ)
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-white/20 text-white font-medium text-sm transition-all"
          >
            ไปที่หน้า Dashboard
          </button>
        </div>
      </section>

    </div>
  );
};
