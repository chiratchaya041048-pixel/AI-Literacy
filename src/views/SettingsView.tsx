import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Type, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  AlertTriangle,
  Compass,
  Contrast
} from 'lucide-react';
import { useLearning } from '../context/LearningContext.tsx';
import { PERSONAS_DATA } from '../data/personasData.ts';
import { LearningPersona } from '../types/index.ts';

export const SettingsView: React.FC = () => {
  const { progress, setNickname, setPersona, updateSettings, resetProgress } = useLearning();

  const [nameInput, setNameInput] = useState(progress.nickname);
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setNickname(nameInput);
    setIsNameSaved(true);
    setTimeout(() => setIsNameSaved(false), 2500);
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    setNameInput('ผู้เรียนรู้ AI');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#F1EDFF] text-[#5B3FD6] flex items-center justify-center">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172554] font-['Prompt']">
              โปรไฟล์และการตั้งค่า (Profile & Settings)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-['Noto_Sans_Thai']">
              ปรับแต่งประสบการณ์การเรียนรู้ การแสดงผล และการจัดการข้อมูลของคุณ
            </p>
          </div>
        </div>
      </div>

      {/* 1. Nickname Setting */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#5B3FD6]" />
          <h2 className="font-bold text-lg text-slate-800 font-['Prompt']">
            ชื่อเล่นสำหรับแสดงผล (Display Nickname)
          </h2>
        </div>
        <p className="text-xs text-slate-600 font-['Noto_Sans_Thai']">
          ชื่อนี้จะปรากฏในข้อความทักทายและบนเกียรติบัตรเมื่อคุณเรียนจบหลักสูตร (ไม่จำเป็นต้องใช้ชื่อจริง)
        </p>

        <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <input
            type="text"
            value={nameInput}
            maxLength={30}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="ใส่ชื่อหรือนามแฝงของคุณ..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3FD6]/30 focus:border-[#5B3FD6]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#5B3FD6] hover:bg-[#485FE6] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            {isNameSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>บันทึกแล้ว!</span>
              </>
            ) : (
              <span>บันทึกชื่อ</span>
            )}
          </button>
        </form>
      </div>

      {/* 2. Persona Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#3478F6]" />
          <h2 className="font-bold text-lg text-slate-800 font-['Prompt']">
            เส้นทางการเรียนรู้ที่เลือก (Learning Persona)
          </h2>
        </div>
        <p className="text-xs text-slate-600 font-['Noto_Sans_Thai']">
          ปรับมุมมอง ตัวอย่างสถานการณ์ และคำแนะนำที่แสดงบนหน้าหลักให้ตรงกับความสนใจของคุณ
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {PERSONAS_DATA.map((persona) => {
            const isSelected = progress.persona === persona.id;

            return (
              <div
                key={persona.id}
                onClick={() => setPersona(persona.id as LearningPersona)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#5B3FD6] bg-[#F1EDFF]/50 ring-2 ring-[#5B3FD6]/10'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-800 font-['Prompt']">
                    {persona.label}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5B3FD6]" />
                  )}
                </div>
                <p className="text-xs text-[#5B3FD6] font-semibold mb-1">
                  {persona.badge}
                </p>
                <p className="text-[11px] text-slate-600 font-['Noto_Sans_Thai'] leading-relaxed">
                  {persona.recommendedFocus}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Accessibility & Font Size Setting */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-[#22A06B]" />
          <h2 className="font-bold text-lg text-slate-800 font-['Prompt']">
            การเข้าถึงและการแสดงผล (Accessibility)
          </h2>
        </div>

        {/* Font size choice */}
        <div>
          <label className="text-xs font-bold text-slate-600 block mb-2">
            ขนาดตัวอักษร (Font Size):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal', label: 'ปกติ (Normal)', sub: '16px' },
              { id: 'large', label: 'ใหญ่ (Large)', sub: '18px - สบายตา' },
              { id: 'xlarge', label: 'ใหญ่พิเศษ (X-Large)', sub: '20px - ผู้สูงอายุ' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => updateSettings({ fontSize: size.id as any })}
                className={`p-3 rounded-xl border text-center transition-all ${
                  progress.settings.fontSize === size.id
                    ? 'border-[#22A06B] bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs block">{size.label}</span>
                <span className="text-[10px] text-slate-400 font-normal">{size.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Animations toggle */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs font-bold text-slate-800">แอนิเมชันและการเคลื่อนไหว (Animations)</p>
            <p className="text-[11px] text-slate-500">ปิดเอฟเฟกต์การเคลื่อนไหวเพื่อการอ่านที่นิ่งและสบายตายิ่งขึ้น</p>
          </div>
          <button
            onClick={() => updateSettings({ animations: !progress.settings.animations })}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              progress.settings.animations ? 'bg-[#5B3FD6]' : 'bg-slate-300'
            }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              progress.settings.animations ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* 4. Privacy & Data Storage Notice */}
      <div className="bg-[#EAF3FF] rounded-3xl p-6 sm:p-8 border border-blue-200 space-y-3">
        <div className="flex items-center gap-2 text-[#3478F6]">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="font-bold text-base sm:text-lg font-['Prompt']">
            การจัดเก็บข้อมูลและความเป็นส่วนตัว (Data Privacy)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-['Noto_Sans_Thai'] leading-relaxed">
          แอปพลิเคชันนี้ทำงานแบบ <strong>Client-side Local Storage</strong> ข้อมูลความคืบหน้า คะแนนสอบ และการตั้งค่าทั้งหมดจัดเก็บเฉพาะในเว็บเบราว์เซอร์ของอุปกรณ์ที่คุณกำลังใช้งานเท่านั้น ไม่มีการส่งข้อมูลส่วนบุคคลของคุณออกไปยังเซิร์ฟเวอร์ภายนอกใด ๆ
        </p>
      </div>

      {/* 5. Reset Progress */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-600">
          <RotateCcw className="w-5 h-5" />
          <h2 className="font-bold text-lg font-['Prompt']">
            ล้างข้อมูลความคืบหน้า (Reset Progress)
          </h2>
        </div>
        <p className="text-xs text-slate-600 font-['Noto_Sans_Thai']">
          หากต้องการเริ่มต้นเรียนรู้ใหม่ตั้งแต่ต้น คุณสามารถล้างประวัติการเรียน คะแนน Pre-test / Post-test และกิจกรรมทั้งหมดได้
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-5 py-2.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
          >
            ล้างข้อมูลความก้าวหน้าทั้งหมด
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลความก้าวหน้าทั้งหมด?</span>
            </div>
            <p className="text-[11px] text-rose-700">
              การกระทำนี้จะล้างคะแนนสอบและบทเรียนที่เรียนจบแล้วทั้งหมด ไม่สามารถย้อนกลับได้
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                ยืนยันล้างข้อมูล
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reference Citation Card */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>หลักสูตรอ้างอิง: สถาบันข้อมูลขนาดใหญ่ (Big Data Institute: BDI)</span>
        <a
          href="https://bdi.or.th/big-data-101/ai-literacy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5B3FD6] hover:underline font-semibold flex items-center gap-1"
        >
          <span>bdi.or.th/big-data-101/ai-literacy</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
