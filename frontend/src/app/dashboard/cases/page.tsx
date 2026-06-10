"use client";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next"; // 👈 عشان نسحب التوكن بتاع اليوزر
import { 
  Briefcase, Plus, Search, Filter, MoreVertical, 
  CalendarClock, User, Scale, FileText, X, Loader2 
} from "lucide-react";

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل من السيرفر
  const [cases, setCases] = useState<any[]>([]); // 👈 مصفوفة فاضية هتتملي من الداتابيز
  const [newCase, setNewCase] = useState({ title: "", client: "", type: "", court: "" });

  // 1. 🔄 دالة جلب القضايا من الباك إند
  const fetchCases = async () => {
    try {
      const token = getCookie("token");
      const res = await fetch("http://localhost:3000/cases", {
        headers: {
          Authorization: `Bearer ${token}` // لازم نبعت الجواز عشان الـ Guard
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // أول ما الصفحة تفتح، يجيب القضايا فوراً
  useEffect(() => {
    fetchCases();
  }, []);

  // دالة تلوين الحالة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
      case "نشطة": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "PENDING":
      case "قيد الانتظار": return "bg-amber-50 text-amber-600 border-amber-200";
      case "CLOSED":
      case "مغلقة": return "bg-slate-100 text-slate-500 border-slate-200";
      default: return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  // 2. 🚀 دالة إرسال القضية الجديدة للسيرفر
  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = getCookie("token");
      const res = await fetch("http://localhost:3000/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newCase.title,
          client: newCase.client, // الباك إند هيكريت موكل بالاسم ده أوتوماتيك
          type: newCase.type,
          court: newCase.court,
          clientId: "new-client-id" // قيمة افتراضية عشان العلاقات اللي عملناها
        })
      });

      if (res.ok) {
        await fetchCases(); // 👈 نعمل تحديث للجدول من الداتابيز بعد الإضافة
        setIsModalOpen(false);
        setNewCase({ title: "", client: "", type: "", court: "" });
      } else {
        alert("حدث خطأ أثناء حفظ القضية!");
      }
    } catch (error) {
      console.error("Error adding case:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* 1. الهيدر وزرار الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-500" /> إدارة القضايا
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">متابعة سير الدعاوى، الجلسات، وتفاصيل الموكلين.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg font-bold text-sm"
        >
          <Plus className="w-4 h-4" /> إضافة قضية جديدة
        </button>
      </div>

      {/* 2. جدول القضايا الفخم */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          // شاشة التحميل
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-amber-500" />
            <p className="font-medium text-sm">جاري جلب القضايا من الخوادم...</p>
          </div>
        ) : cases.length === 0 ? (
          // حالة عدم وجود قضايا
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Briefcase className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium text-lg text-slate-500">لا توجد قضايا مسجلة حتى الآن.</p>
            <p className="text-sm mt-1">اضغط على زر "إضافة قضية جديدة" للبدء.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200/60">
                  <th className="p-4 text-xs font-bold text-slate-500">رقم / عنوان الدعوى</th>
                  <th className="p-4 text-xs font-bold text-slate-500">الموكل</th>
                  <th className="p-4 text-xs font-bold text-slate-500">المحكمة المختصة</th>
                  <th className="p-4 text-xs font-bold text-slate-500">الجلسة القادمة</th>
                  <th className="p-4 text-xs font-bold text-slate-500">الحالة</th>
                  <th className="p-4 text-xs font-bold text-slate-500 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                          <FileText className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{caseItem.title}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                            رقم: <span className="font-bold text-slate-600">{caseItem.caseNumber}</span> • {caseItem.type}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        {/* بنقرأ اسم الموكل من العلاقة اللي رجعت من الباك إند */}
                        <span className="font-bold text-slate-700 text-sm">{caseItem.client?.name || 'غير محدد'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold text-slate-600 text-sm">{caseItem.court}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <CalendarClock className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-slate-700 text-sm">لم يتم التحديد</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadge(caseItem.status)}`}>
                        {caseItem.status === 'ACTIVE' ? 'نشطة' : caseItem.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🚀 نافذة (Modal) إضافة قضية جديدة */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-500" /> فتح ملف قضية جديدة
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition-colors bg-white p-1 rounded-md shadow-sm border border-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddCase} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">عنوان/موضوع الدعوى <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="مثال: دعوى صحة توقيع" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  value={newCase.title} onChange={(e) => setNewCase({...newCase, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">اسم الموكل <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="ابحث أو اكتب اسم الموكل..." className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  value={newCase.client} onChange={(e) => setNewCase({...newCase, client: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">نوع الدعوى</label>
                  <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all bg-white"
                    value={newCase.type} onChange={(e) => setNewCase({...newCase, type: e.target.value})}>
                    <option value="">اختر النوع...</option>
                    <option value="مدني كلي">مدني كلي</option>
                    <option value="أحوال شخصية">أحوال شخصية</option>
                    <option value="جنائي">جنائي</option>
                    <option value="تجاري">تجاري</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">المحكمة المختصة</label>
                  <input type="text" placeholder="مثال: محكمة الأسرة" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                    value={newCase.court} onChange={(e) => setNewCase({...newCase, court: e.target.value})} />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "جاري الحفظ..." : "حفظ الدعوى بالجدول"}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition-all">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}