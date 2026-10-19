import React, { useEffect } from 'react';
import { X, Award, CheckCircle, Download, Share2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearning } from '../context/LearningContext.tsx';
import { PERSONAS_DATA } from '../data/personasData.ts';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  const { progress } = useLearning();

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not supported
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const personaObj = PERSONAS_DATA.find(p => p.id === progress.persona) || PERSONAS_DATA[0];
  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Top controls */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#5B3FD6]" />
            <span className="font-semibold text-slate-800 text-sm">เกียรติบัตรความสำเร็จการเรียนรู้ (Certificate of Achievement)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Styled for beautiful certificate presentation) */}
        <div id="certificate-content" className="p-8 sm:p-12 bg-linear-to-b from-white via-slate-50 to-[#F1EDFF]/30 text-center relative border-8 border-double border-indigo-100 m-4 rounded-xl">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#5B3FD6]/40" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#5B3FD6]/40" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#5B3FD6]/40" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#5B3FD6]/40" />

          {/* Emblem */}
          <div className="mx-auto w-16 h-16 rounded-full bg-linear-to-tr from-[#5B3FD6] to-[#3478F6] flex items-center justify-center text-white shadow-lg mb-4">
            <Sparkles className="w-8 h-8" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#5B3FD6] font-semibold mb-1">
            Certificate of AI Literacy Excellence
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt'] mb-2">
            เกียรติบัตรรับรองความฉลาดรู้ด้านปัญญาประดิษฐ์
          </h2>
          <p className="text-xs text-slate-500 mb-6 font-['Noto_Sans_Thai']">
            ตามกรอบแนวคิดความฉลาดรู้ด้าน AI สถาบันข้อมูลขนาดใหญ่ (BDI Framework)
          </p>

          <p className="text-sm text-slate-600 mb-2">ขอมอบเกียรติบัตรฉบับนี้ให้แก่</p>
          
          {/* Recipient Name */}
          <div className="my-3 py-2 border-b-2 border-dashed border-[#5B3FD6]/30 inline-block px-8 max-w-full">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#5B3FD6] font-['Prompt'] tracking-wide">
              {progress.nickname}
            </h3>
          </div>

          <p className="text-sm text-slate-700 max-w-xl mx-auto mt-3 mb-6 leading-relaxed">
            ได้ผ่านการเรียนรู้หลักสูตร <strong>AI Literacy: รู้ทัน AI ใช้เป็น คิดอย่างรับผิดชอบ</strong> ทั้ง 6 โมดูล และผ่านการประเมินผลการเรียนรู้ด้านปัญญาประดิษฐ์ในฐานะ <strong>{personaObj.badge}</strong>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-3 px-4 bg-white/80 rounded-xl border border-indigo-100 shadow-xs mb-8">
            <div>
              <p className="text-[11px] text-slate-500">คะแนน Post-test</p>
              <p className="text-lg font-bold text-[#22A06B]">{progress.postTestScore ?? 100} / 100</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">โมดูลที่สำเร็จ</p>
              <p className="text-lg font-bold text-[#5B3FD6]">6 / 6 โมดูล</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">4 เสาหลัก BDI</p>
              <p className="text-lg font-bold text-[#3478F6]">ผ่านครบถ้วน</p>
            </div>
          </div>

          {/* Pillars Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['Engage with AI', 'Create with AI', 'Manage AI', 'Design AI'].map((pillar) => (
              <span key={pillar} className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F1EDFF] text-[#5B3FD6] px-2.5 py-1 rounded-full border border-purple-200">
                <CheckCircle className="w-3 h-3 text-[#22A06B]" />
                <span>{pillar}</span>
              </span>
            ))}
          </div>

          {/* Signatures & Date */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-xs text-slate-500 px-4">
            <div className="text-left">
              <p className="font-semibold text-slate-700">AI Literacy Learning Initiative</p>
              <p className="text-[10px] text-slate-400">Digital Education for All Citizens</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-700">วันที่ออกเกียรติบัตร</p>
              <p className="text-[11px] text-slate-600">{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
