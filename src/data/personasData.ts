import { PersonaInfo } from '../types/index.ts';

export const PERSONAS_DATA: PersonaInfo[] = [
  {
    id: 'beginner',
    label: 'ผู้เริ่มต้น (Beginner)',
    badge: 'เริ่มต้นรู้จัก AI',
    description: 'เหมาะสำหรับผู้ที่เพิ่งเริ่มสนใจ AI ไม่มีพื้นฐานเทคโนโลยี ต้องการเข้าใจหลักการง่าย ๆ และการใช้งานพื้นฐานที่ปลอดภัย',
    iconName: 'Sparkles',
    targetAudience: 'ประชาชนทั่วไป ผู้สูงวัย และผู้เริ่มต้น',
    recommendedFocus: 'เข้าใจความสามารถ ข้อจำกัด และการแยกแยะข้อมูลจริงกับข้อมูลลวง',
    recommendedModuleId: 1
  },
  {
    id: 'student',
    label: 'นักเรียน / นักศึกษา (Student)',
    badge: 'AI เพื่อการเรียนรู้',
    description: 'เน้นการใช้ AI เป็นติวเตอร์ส่วนตัว ช่วยสรุปบทเรียน คิดโจทย์ทบทวน และการใช้ AI อย่างซื่อสัตย์ทางวิชาการโดยไม่ละเมิดลิขสิทธิ์',
    iconName: 'GraduationCap',
    targetAudience: 'นักเรียน นักศึกษา และผู้ที่กำลังศึกษาค้นคว้า',
    recommendedFocus: 'เทคนิคการเขียน Prompt เพื่อการค้นคว้า การตรวจทานข้อมูล และจริยธรรมผลงานทางวิชาการ',
    recommendedModuleId: 3
  },
  {
    id: 'professional',
    label: 'คนทำงาน (Professional)',
    badge: 'AI เพื่อการทำงาน',
    description: 'เน้นเพิ่มผลิตภาพ (Productivity) ร่างอีเมล วิเคราะห์ข้อมูล ระดมสมอง และการกำกับดูแลความลับองค์กร (Data Privacy & IP)',
    iconName: 'Briefcase',
    targetAudience: 'พนักงานบริษัท ผู้ประกอบการ ฟรีแลนซ์ และผู้บริหาร',
    recommendedFocus: 'Manage AI & Design AI การกำกับดูแลความเสี่ยง และการตรวจสอบผลงานขั้นสุดท้าย (Human-in-the-loop)',
    recommendedModuleId: 4
  },
  {
    id: 'everyday',
    label: 'ผู้ใช้งานในชีวิตประจำวัน (Everyday User)',
    badge: 'AI ในชีวิตประจำวัน',
    description: 'เน้นเข้าใจบริการรอบตัว เช่น อัลกอริทึมแนะนำวิดีโอ การแปลภาษา ผู้ช่วยสั่งการด้วยเสียง และการระวังมิจฉาชีพที่ใช้ Deepfake',
    iconName: 'Home',
    targetAudience: 'ผู้ใช้สมาร์ตโฟน ผู้บริโภคสื่อดิจิทัล และผู้สูงอายุ',
    recommendedFocus: 'การรู้เท่าทันสื่อ ความปลอดภัยข้อมูลส่วนบุคคล และการป้องกันภัยไซเบอร์จาก AI',
    recommendedModuleId: 2
  }
];
