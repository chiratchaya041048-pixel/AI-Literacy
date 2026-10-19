import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  BarChart3, 
  Settings, 
  Home, 
  Menu, 
  X, 
  CheckCircle2, 
  Type
} from 'lucide-react';
import { useLearning } from '../context/LearningContext.tsx';
import { PERSONAS_DATA } from '../data/personasData.ts';

export type AppView = 'landing' | 'dashboard' | 'modules' | 'module-detail' | 'pre-test' | 'post-test' | 'lab' | 'analytics' | 'settings';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView, moduleId?: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { progress, progressPercentage, updateSettings } = useLearning();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentPersona = PERSONAS_DATA.find(p => p.id === progress.persona) || PERSONAS_DATA[0];

  const handleNav = (view: AppView, moduleId?: number) => {
    onNavigate(view, moduleId);
    setMobileMenuOpen(false);
  };

  const cycleFontSize = () => {
    const current = progress.settings.fontSize;
    if (current === 'normal') updateSettings({ fontSize: 'large' });
    else if (current === 'large') updateSettings({ fontSize: 'xlarge' });
    else updateSettings({ fontSize: 'normal' });
  };

  const navItems = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: Home },
    { id: 'modules', label: 'บทเรียน (6 โมดูล)', icon: BookOpen },
    { id: 'lab', label: 'ห้องทดลอง AI Lab', icon: FlaskConical },
    { id: 'analytics', label: 'ผลการเรียน', icon: BarChart3 },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & App Name */}
          <div 
            onClick={() => handleNav('landing')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-linear-to-tr from-[#5B3FD6] via-[#485FE6] to-[#3478F6] flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-[#172554] font-['Prompt']">
                  AI Literacy
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[11px] font-semibold bg-[#F1EDFF] text-[#5B3FD6] rounded-full border border-purple-200">
                  BDI Framework
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate max-w-xs font-['Noto_Sans_Thai']">
                รู้ทัน AI ใช้เป็น คิดอย่างรับผิดชอบ
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'modules' && currentView === 'module-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id as AppView)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#F1EDFF] text-[#5B3FD6] font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#5B3FD6]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Access Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Font size adjuster button */}
            <button
              onClick={cycleFontSize}
              title={`ปรับขนาดตัวอักษร (ปัจจุบัน: ${
                progress.settings.fontSize === 'normal' ? 'ปกติ' : progress.settings.fontSize === 'large' ? 'ใหญ่' : 'ใหญ่พิเศษ'
              })`}
              className="p-2 text-slate-600 hover:text-[#5B3FD6] hover:bg-[#F1EDFF] rounded-lg transition-colors border border-slate-200 sm:flex items-center gap-1 text-xs font-semibold"
            >
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">
                {progress.settings.fontSize === 'normal' ? 'A' : progress.settings.fontSize === 'large' ? 'A+' : 'A++'}
              </span>
            </button>

            {/* Overall Progress Widget */}
            <button
              onClick={() => handleNav('analytics')}
              title="ดูภาพรวมความก้าวหน้า"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-[#EAF3FF] border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors"
            >
              <div className="w-16 bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-linear-to-r from-[#5B3FD6] to-[#3478F6] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="font-semibold text-[#5B3FD6]">{progressPercentage}%</span>
            </button>

            {/* Persona Badge */}
            <div 
              onClick={() => handleNav('settings')}
              title={`บทบาท: ${currentPersona.label} (คลิกเพื่อเปลี่ยน)`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF3FF] text-[#1D4ED8] rounded-full text-xs font-medium border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#3478F6] animate-ping" />
              <span className="truncate max-w-[120px]">{progress.nickname}</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in duration-200">
          <div className="p-2.5 mb-2 rounded-lg bg-linear-to-r from-[#F1EDFF] to-[#EAF3FF] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#5B3FD6]">ผู้เรียน: {progress.nickname}</p>
              <p className="text-[11px] text-slate-600">{currentPersona.badge}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
              <span className="text-xs font-bold text-[#172554]">{progressPercentage}% สำเร็จ</span>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'modules' && currentView === 'module-detail');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id as AppView)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F1EDFF] text-[#5B3FD6] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#5B3FD6]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => handleNav('pre-test')}
              className="px-3 py-2 text-center text-xs font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              แบบทดสอบก่อนเรียน
            </button>
            <button
              onClick={() => handleNav('post-test')}
              className="px-3 py-2 text-center text-xs font-medium rounded-lg bg-indigo-50 text-[#5B3FD6] hover:bg-indigo-100"
            >
              แบบทดสอบหลังเรียน
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
