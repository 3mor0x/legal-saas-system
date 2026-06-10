"use client";

import { 
  CalendarDays, 
  Plus, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Gavel,
  Hash
} from "lucide-react";

export default function SessionsPage() {
  // بيانات الجلسات بتنسيق مطور ومنظم
  const sessions = [
    {
      id: 1,
      title: "جلسة نطق بالحكم - قضية مدني كلي",
      client: "أحمد محمد السيد",
      caseNumber: "2023 / 4521",
      location: "محكمة أسيوط الابتدائية - الدائرة الرابعة",
      time: "09:00 صباحاً",
      date: "اليوم",
      status: "عاجل",
      statusColor: "bg-rose-50 text-rose-700 border-rose-200/60",
      iconColor: "text-rose-600 bg-rose-50 border-rose-100"
    },
    {
      id: 2,
      title: "جلسة مرافعة - جنحة ضرب واعتداء",
      client: "محمود علي عبد الرحمن",
      caseNumber: "2024 / 112",
      location: "محكمة ديروط الجزئية - بندر ديروط",
      time: "11:30 صباحاً",
      date: "اليوم",
      status: "قادمة",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      iconColor: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      id: 3,
      title: "اجتماع استشارة قانونية وتأسيس شركات",
      client: "شركة التوحيد للمقاولات والتوريدات",
      caseNumber: "مستندات مكتبية داخلي",
      location: "مقر مكتب الأستاذ محمود شعبان",
      time: "05:00 مساءً",
      date: "غداً",
      status: "مجدول",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200/60",
      iconColor: "text-blue-600 bg-blue-50 border-blue-100"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. الهيدر وزرار الإضافة */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            الجلسات والمواعيد <CalendarDays className="w-7 h-7 text-amber-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">إدارة أجندة المحاكم والقرارات والاجتماعات الخاصة بالمكتب وفريق العمل.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#040814] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-slate-900/20 text-sm">
          <Plus className="w-4 h-4" /> إضافة جلسة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. الخط الزمني للجلسات المطور بالكامل لتعديل الجزء الشمال */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/20">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">جدول أعمال القضايا</h2>
                <p className="text-xs text-slate-400 mt-0.5">متابعة دقيقة لجلسات اليوم والغد</p>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">تحديث فوري</span>
            </div>

            <div className="space-y-6">
              {sessions.map((session) => (
                <div key={session.id} className="group p-5 md:p-6 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col md:flex-row gap-5">
                  
                  {/* اليمين: الأيقونة */}
                  <div className="flex md:flex-col items-center shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${session.iconColor} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      <Gavel className="w-5 h-5" />
                    </div>
                  </div>

                  {/* المنتصف والشمال: تفاصيل الدعوى المنظمة بالمللي */}
                  <div className="flex-1 space-y-4">
                    
                    {/* السطر الأول: موضوع الدعوى والحالة */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                        {session.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-black border tracking-wide shrink-0 ${session.statusColor}`}>
                        {session.status}
                      </span>
                    </div>
                    
                    {/* الشبكة المطورة بالكامل للجزء الشمال لمنع الانضغاط والترحيل */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      
                      {/* الموكل */}
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 group-hover:bg-slate-100/50 transition-colors">
                        <User className="w-4 h-4 text-slate-400 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 leading-none">الموكل القضائي</p>
                          <p className="text-xs md:text-sm font-bold text-slate-700 truncate mt-1.5">{session.client}</p>
                        </div>
                      </div>

                      {/* رقم القضية */}
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 group-hover:bg-slate-100/50 transition-colors">
                        <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 leading-none">رقم الدعوى / القضية</p>
                          <p className="text-xs md:text-sm font-black text-slate-800 mt-1.5" dir="ltr">{session.caseNumber}</p>
                        </div>
                      </div>

                      {/* الوقت والتاريخ */}
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 group-hover:bg-slate-100/50 transition-colors">
                        <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 leading-none">توقيت الحضور</p>
                          <p className="text-xs md:text-sm font-bold text-slate-700 mt-1.5">{session.time} <span className="text-amber-600 font-black">({session.date})</span></p>
                        </div>
                      </div>

                      {/* المحكمة والدائرة */}
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 group-hover:bg-slate-100/50 transition-colors">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 leading-none">المقر / المحكمة المباشرة</p>
                          <p className="text-xs md:text-sm font-bold text-slate-700 truncate mt-1.5">{session.location}</p>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* أقصى الشمال: زرار التحكم الإداري النقاط */}
                  <div className="absolute top-4 left-4 md:relative md:top-0 md:left-0 shrink-0">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. الأجندة الجانبية المصغرة التابعة للقسم المطور */}
        <div className="space-y-6">
          <div className="bg-[#040814] rounded-[1.5rem] p-6 shadow-xl shadow-slate-900/20 text-white relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h2 className="text-base font-bold">أكتوبر 2026</h2>
              <div className="flex gap-1.5">
                <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
                <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-black text-slate-500 mb-4 relative z-10">
              <div>ح</div><div>ن</div><div>ث</div><div>ر</div><div>خ</div><div>ج</div><div>س</div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold relative z-10">
              <div className="p-2 text-slate-800">27</div><div className="p-2 text-slate-800">28</div><div className="p-2 text-slate-800">29</div><div className="p-2 text-slate-800">30</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">1</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">2</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors relative">
                3 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></span>
              </div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">4</div>
              <div className="p-2 bg-amber-500 text-[#040814] rounded-lg cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.6)]">5</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors relative">
                6 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></span>
              </div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">7</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">8</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">9</div>
              <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">10</div>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] p-5 border border-slate-200/60 shadow-lg shadow-slate-200/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 mb-1">جلسات مؤجلة إدارياً</p>
              <p className="text-2xl font-black text-slate-900">4</p>
            </div>
            <div className="w-11 h-11 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center border border-rose-100">
              <Gavel className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}