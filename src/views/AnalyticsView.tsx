import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { AppView } from '../components/Navbar.tsx';
import { useLearning } from '../context/LearningContext.tsx';
import { CertificateModal } from '../components/CertificateModal.tsx';
import { PERSONAS_DATA } from '../data/personasData.ts';

interface AnalyticsViewProps {
  onNavigate: (view: AppView, moduleId?: number) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onNavigate }) => {
  const { progress, progressPercentage, scoreDelta } = useLearning();
  const [certificateOpen, setCertificateOpen] = useState(false);

  const personaObj = PERSONAS_DATA.find(p => p.id === progress.persona) || PERSONAS_DATA[0];
  const hasPreTest = progress.preTestScore !== null;
  const hasPostTest = progress.postTestScore !== null;

  // Domain competencies analysis based on actual completed data
  const domains = [
    { 
      name: 'พื้นฐานความเข้าใจ AI (Foundations)', 
      moduleId: 1, 
      preEst: hasPreTest ? Math.min(100, (progress.preTestScore || 0) + 10) : 0, 
      postEst: hasPostTest ? (progress.postTestScore || 0) : progress.completedModules.includes(1) ? 90 : 40 
    },
    { 
      name: 'Engage with AI (การสั่งการและ Prompt)', 
      moduleId: 3, 
      preEst: hasPreTest ? Math.max(20, (progress.preTestScore || 0) - 10) : 0, 
      postEst: hasPostTest ? (progress.postTestScore || 0) : progress.completedModules.includes(3) ? 85 : 30 
    },
    { 
      name: 'Create with AI (การร่วมสร้างสรรค์และลิขสิทธิ์)', 
      moduleId: 4, 
      preEst: hasPreTest ? (progress.preTestScore || 0) : 0, 
      postEst: hasPostTest ? (progress.postTestScore || 0) : progress.completedModules.includes(4) ? 88 : 35 
    },
    { 
      name: 'Manage AI (การกำกับดูแล ตรวจสอบ และ PDPA)', 
      moduleId: 5, 
      preEst: hasPreTest ? Math.max(30, (progress.preTestScore || 0) - 5) : 0, 
      postEst: hasPostTest ? (progress.postTestScore || 0) : progress.completedModules.includes(5) ? 92 : 25 
    },
    { 
      name: 'Design AI (การคิดเชิงระบบและแก้ปัญหาจริง)', 
      moduleId: 6, 
      preEst: hasPreTest ? Math.max(20, (progress.preTestScore || 0) - 15) : 0, 
      postEst: hasPostTest ? (progress.postTestScore || 0) : progress.completedModules.includes(6) ? 80 : 20 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EDFF] text-[#5B3FD6] text-xs font-semibold mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>รายงานวิเคราะห์การเรียนรู้ส่วนบุคคล</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt']">
            Learning Analytics & Progress
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-['Noto_Sans_Thai'] max-w-2xl leading-relaxed">
            ติดตามพัฒนาการ ประเมินเปรียบเทียบคะแนนก่อน-หลังเรียน และวิเคราะห์จุดแข็งพร้อมหัวข้อที่แนะนำให้ทบทวนเพิ่มเติม
          </p>
        </div>

        {/* Certificate Button */}
        {hasPostTest && (
          <button
            onClick={() => setCertificateOpen(true)}
            className="px-5 py-3 rounded-2xl bg-linear-to-r from-[#5B3FD6] to-[#3478F6] text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
          >
            <Award className="w-5 h-5 text-amber-300" />
            <span>เปิดดูเกียรติบัตรของคุณ</span>
          </button>
        )}
      </div>

      {/* Comparison Score Cards (Pre vs Post vs Delta) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Pre-test score */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            คะแนนก่อนเรียน (Pre-test)
          </p>
          {hasPreTest ? (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#172554] font-['Prompt']">
                {progress.preTestScore}
              </span>
              <span className="text-xs text-slate-500">/ 100 คะแนน</span>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-amber-600 mb-2">ยังไม่ได้ทำแบบทดสอบ</p>
              <button
                onClick={() => onNavigate('pre-test')}
                className="text-xs font-semibold text-[#5B3FD6] hover:underline"
              >
                ทำแบบทดสอบก่อนเรียน
              </button>
            </div>
          )}
        </div>

        {/* Post-test score */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            คะแนนหลังเรียน (Post-test)
          </p>
          {hasPostTest ? (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-[#22A06B] font-['Prompt']">
                {progress.postTestScore}
              </span>
              <span className="text-xs text-slate-500">/ 100 คะแนน</span>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-2">รอการประเมินผล</p>
              <button
                onClick={() => onNavigate('post-test')}
                className="text-xs font-semibold text-[#22A06B] hover:underline"
              >
                เข้าทำแบบทดสอบหลังเรียน
              </button>
            </div>
          )}
        </div>

        {/* Delta change */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            การเปลี่ยนแปลงของคะแนน (Δ Score)
          </p>
          {scoreDelta !== null ? (
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold font-['Prompt'] ${
                scoreDelta > 0 ? 'text-[#22A06B]' : scoreDelta === 0 ? 'text-blue-600' : 'text-amber-600'
              }`}>
                {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
              </span>
              <span className="text-xs text-slate-500">คะแนน</span>
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-medium">
              ต้องทำทั้งแบบทดสอบก่อนเรียนและหลังเรียนเพื่อเปรียบเทียบ
            </p>
          )}
        </div>
      </div>

      {/* Encouragement & Pedagogical Reflection Box */}
      {scoreDelta !== null && (
        <div className={`p-6 rounded-3xl border ${
          scoreDelta > 0 
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
            : scoreDelta === 0 
            ? 'bg-blue-50/70 border-blue-200 text-blue-950' 
            : 'bg-amber-50/70 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-current shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm sm:text-base font-['Prompt'] mb-1">
                {scoreDelta > 0
                  ? 'ยินดีด้วยอย่างยิ่ง! พัฒนาการทางความฉลาดรู้ด้าน AI ของคุณเพิ่มขึ้นอย่างเห็นได้ชัด'
                  : scoreDelta === 0
                  ? 'คุณมีความเข้าใจที่มั่นคงในระดับเดิม และสามารถต่อยอดความรู้เชิงลึกได้อีก'
                  : 'อย่าเพิ่งท้อแท้! ข้อสอบหลังเรียนมีความท้าทายในเชิงการนำไปใช้ คุณสามารถกลับไปทบทวนได้เสมอ'}
              </h4>
              <p className="text-xs sm:text-sm font-['Noto_Sans_Thai'] leading-relaxed opacity-90">
                {scoreDelta > 0
                  ? 'คุณได้นำความรู้จากบทเรียน 6 โมดูล และการฝึกใน Interactive AI Lab มาประยุกต์ใช้ในการวิเคราะห์โจทย์ได้อย่างถูกต้องและปลอดภัย'
                  : 'การเรียนรู้เรื่อง AI เป็นกระบวนการต่อเนื่อง แนะนำให้ทบทวนโมดูลที่เกี่ยวข้องกับการตรวจสอบข้อเท็จจริง (Manage AI) และการเขียน Prompt (Engage with AI)'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Competencies Breakdown Visual Bar Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-[#172554] font-['Prompt']">
              การประเมินสมรรถนะตาม 4 เสาหลัก BDI
            </h3>
            <p className="text-xs text-slate-500 font-['Noto_Sans_Thai']">
              เปรียบเทียบระดับความเข้าใจในแต่ละทักษะย่อย
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-slate-500">ก่อนเรียน (Pre-test)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#5B3FD6]" />
              <span className="text-[#5B3FD6]">หลังเรียน (Post-test)</span>
            </div>
          </div>
        </div>

        {/* Visual Domain Progress Bars */}
        <div className="space-y-6">
          {domains.map((dom, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-800 font-['Prompt']">
                  {dom.name}
                </span>
                <span className="text-xs font-bold text-[#5B3FD6]">
                  {hasPostTest ? `${dom.postEst}%` : progress.completedModules.includes(dom.moduleId) ? 'เรียนจบแล้ว' : 'ยังไม่เรียน'}
                </span>
              </div>

              {/* Double Bar Comparison */}
              <div className="space-y-1">
                {/* Pre bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-slate-300 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${hasPreTest ? dom.preEst : 0}%` }}
                  />
                </div>
                {/* Post / Mastery bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-linear-to-r from-[#5B3FD6] to-[#3478F6] h-full rounded-full transition-all duration-700" 
                    style={{ width: `${dom.postEst}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Topics to Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-4">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-[#22A06B]" />
            <h4 className="font-bold text-base sm:text-lg font-['Prompt']">
              จุดแข็งที่ผู้เรียนแสดงให้เห็น (Strengths)
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai']">
            <li className="flex items-start gap-2">
              <span className="text-[#22A06B] font-bold">•</span>
              <span>เข้าใจว่า AI ทำงานด้วยการคำนวณและตรวจหารูปแบบทางสถิติ ไม่ได้มีความรู้สึกนึกคิดจริง</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22A06B] font-bold">•</span>
              <span>ตระหนักถึงความปลอดภัย ไม่ป้อนข้อมูลส่วนบุคคลหรือความลับองค์กรลงใน AI สาธารณะ</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22A06B] font-bold">•</span>
              <span>ยึดมั่นหลักการ Human-in-the-loop มนุษย์เป็นผู้ตรวจสอบและตัดสินใจขั้นสุดท้ายเสมอ</span>
            </li>
          </ul>
        </div>

        {/* Topics to Review */}
        <div className="bg-purple-50/50 rounded-3xl p-6 sm:p-8 border border-purple-200 space-y-4">
          <div className="flex items-center gap-2 text-[#5B3FD6]">
            <Lightbulb className="w-5 h-5 text-[#5B3FD6]" />
            <h4 className="font-bold text-base sm:text-lg font-['Prompt']">
              หัวข้อที่แนะนำให้ทบทวนเพิ่มเติม (Recommended Review)
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai']">
            <li className="flex items-start justify-between gap-2">
              <span className="flex items-start gap-2">
                <span className="text-[#5B3FD6] font-bold">•</span>
                <span>สูตรสำเร็จการเขียน Prompt 4 องค์ประกอบ (P-G-C-F)</span>
              </span>
              <button 
                onClick={() => onNavigate('module-detail', 3)} 
                className="text-xs text-[#5B3FD6] font-semibold hover:underline shrink-0"
              >
                โมดูล 3
              </button>
            </li>
            <li className="flex items-start justify-between gap-2">
              <span className="flex items-start gap-2">
                <span className="text-[#5B3FD6] font-bold">•</span>
                <span>การจับผิด AI Hallucination และขั้นตอน Fact-checking กฎหมาย</span>
              </span>
              <button 
                onClick={() => onNavigate('module-detail', 2)} 
                className="text-xs text-[#5B3FD6] font-semibold hover:underline shrink-0"
              >
                โมดูล 2
              </button>
            </li>
            <li className="flex items-start justify-between gap-2">
              <span className="flex items-start gap-2">
                <span className="text-[#5B3FD6] font-bold">•</span>
                <span>ลิขสิทธิ์ผลงานสร้างสรรค์จาก Generative AI และการระบุแหล่งที่มา</span>
              </span>
              <button 
                onClick={() => onNavigate('module-detail', 4)} 
                className="text-xs text-[#5B3FD6] font-semibold hover:underline shrink-0"
              >
                โมดูล 4
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
      />

    </div>
  );
};
