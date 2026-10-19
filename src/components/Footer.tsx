import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { AppView } from './Navbar.tsx';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#5B3FD6] to-[#3478F6] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white font-['Prompt']">
                AI Literacy
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-['Noto_Sans_Thai'] max-w-md">
              <span className="text-white font-semibold">รู้ทัน AI ใช้เป็น คิดอย่างรับผิดชอบ</span> (Learn AI. Think Critically. Use Responsibly.) 
              แอปพลิเคชันการเรียนรู้ดิจิทัลเพื่อประชาชนทุกช่วงวัย ส่งเสริมการใช้งาน AI อย่างปลอดภัย มีจริยธรรม และมีวิจารณญาณ
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ความปลอดภัยและความเป็นส่วนตัว: ข้อมูลบันทึกในเบราว์เซอร์ของคุณเท่านั้น (Local Storage)</span>
            </div>
          </div>

          {/* Quick Learning Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 font-['Prompt'] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#3478F6]" /> เส้นทางการเรียนรู้
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  หน้าหลัก (Dashboard)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('modules')} className="hover:text-white transition-colors">
                  บทเรียน 6 โมดูล BDI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab')} className="hover:text-white transition-colors">
                  ห้องทดลองจำลอง (AI Lab)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pre-test')} className="hover:text-white transition-colors">
                  แบบทดสอบก่อนเรียน (Pre-test)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('post-test')} className="hover:text-white transition-colors">
                  แบบทดสอบหลังเรียน (Post-test)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Source & Reference */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 font-['Prompt']">
              แหล่งข้อมูลอ้างอิงหลัก
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              เนื้อหาหลักสูตรได้รับการเรียบเรียงและอ้างอิงตามกรอบแนวคิดความฉลาดรู้ด้านปัญญาประดิษฐ์ของ
              <span className="text-slate-200 font-medium"> สถาบันข้อมูลขนาดใหญ่ (องค์การมหาชน) - BDI</span>
            </p>
            <a
              href="https://bdi.or.th/big-data-101/ai-literacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <span>อ่านบทความต้นฉบับ BDI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Literacy Application. พัฒนาขึ้นเพื่อประโยชน์ทางการศึกษาแก่สาธารณะ</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>ร่วมสร้างสังคมไทยรู้เท่าทัน AI</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>เพื่ออนาคตดิจิทัลที่ยั่งยืน</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
