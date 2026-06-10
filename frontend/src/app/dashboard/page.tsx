"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";
import FileUploader from "@/components/FileUploader";
import io, { Socket } from "socket.io-client";
import { 
  Clock, Scale, LogOut, MessageSquare, Send, CheckCheck, 
  CheckCircle2, CalendarPlus, FilePlus, Users, Briefcase, Wallet 
} from "lucide-react";

let socket: Socket;

export default function DashboardHomePage() {
  // 1. استخراج setAuth عشان نحفظ فيها بيانات اليوزر بعد فك التوكن
  const { user, logout, setAuth } = useAuthStore();
  const router = useRouter();

  // ====== States ======
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ====== 🚀 لقط التوكن من الرابط وفك شفرته ======
  useEffect(() => {
    // بنقرأ التوكن من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    
    if (urlToken) {
      // 1. نحفظ التوكن في الكوكيز عشان الـ Middleware يرضى يدخلنا بعد كده
      setCookie("token", urlToken);
      
      // 2. نفك شفرة التوكن (JWT) عشان نطلع بيانات اليوزر منه
      try {
        const payloadBase64 = urlToken.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const payload = JSON.parse(decodedJson);
        
        // 3. نحفظ بيانات اليوزر في الـ Store عشان الشاشة تفتح وتجيب اسمه
        setAuth({
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          role: payload.role
        }, urlToken);
        
      } catch(e) {
        console.error("Error decoding token", e);
      }
      
      // 4. ننظف الرابط ونشيل التوكن منه لشياكة الـ URL والأمان
      window.history.replaceState(null, "", "/dashboard");
    }
  }, [setAuth]);

  const handleLogout = () => {
    deleteCookie("token");
    logout();
    router.push("/login");
  };

  // ====== WebSocket Logic ======
  useEffect(() => {
    if (!user || user.role !== "CLIENT") return;
    socket = io("http://localhost:3000");
    socket.emit("joinRoom", { userId: "CLIENT" });
    socket.on("newMessage", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => { socket.disconnect(); };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      senderId: "CLIENT",
      senderName: user?.name || "الموكل",
      receiverId: "OFFICE_OWNER",
      text: input,
      timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };
    socket.emit("privateMessage", newMsg);
    setMessages((prev) => [...prev, { ...newMsg, isMine: true }]);
    setInput("");
  };

  // ⏳ عرض Loader احترافي أثناء فك شفرة التوكن وتحميل البيانات
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold text-sm animate-pulse">جاري إعداد بيئة العمل...</p>
      </div>
    );
  }

  // =========================================================
  // 🧑‍💼 1. شاشة الموكل (CLIENT)
  // =========================================================
  if (user.role === "CLIENT") {
    return (
      <div className="min-h-screen bg-slate-50 pb-10">
        {/* هيدر البوابة */}
        <header className="bg-slate-900 text-white py-6 px-6 md:px-12 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 shadow-lg">
              <Scale className="w-7 h-7" />
            </div>
            // ... جوه الـ return بتاع الـ CLIENT
<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
  <h3 className="font-bold text-slate-900 mb-4">أرشيف مستندات القضية</h3>
  <FileUploader caseId="القضية-رقم-4052" />
</div>
            <div>
              <h1 className="text-xl font-black">بوابة الموكلين الرقمية</h1>
              <p className="text-amber-400 text-xs font-medium mt-0.5">أهلاً بك، أ. {user.name}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 px-4 py-2.5 rounded-xl transition-all font-bold text-xs">
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
        </header>

        {/* محتوى الشاشة مقسم لعمودين (القضية + الشات) */}
        <div className="max-w-7xl mx-auto mt-8 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
          
          {/* العمود الأيمن (مسار القضية) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><CalendarPlus className="w-6 h-6" /></div>
                <div><h3 className="font-bold text-slate-900">طلب موعد استشارة 📅</h3><p className="text-xs text-slate-500 mt-1">احجز موعداً مع محاميك.</p></div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><FilePlus className="w-6 h-6" /></div>
                <div><h3 className="font-bold text-slate-900">طلب رفع دعوى جديدة ⚖️</h3><p className="text-xs text-slate-500 mt-1">ابدأ إجراءات قضية جديدة.</p></div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">مسار القضية الحالية</h2>
                  <p className="text-slate-500 text-sm mt-1">دعوى صحة توقيع - رقم 4052 لسنة 2026</p>
                </div>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold">متداولة</span>
              </div>
              <div className="relative border-r-2 border-slate-100 pr-6 space-y-8">
                <div className="relative">
                  <div className="absolute -right-[35px] top-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                  <h4 className="font-bold text-slate-900">قيد وتسجيل الدعوى</h4>
                  <p className="text-sm text-slate-500 mt-1">تم قيد الدعوى في محكمة الجيزة الابتدائية وتحديد الدائرة.</p>
                </div>
                <div className="relative">
                  <div className="absolute -right-[35px] top-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                  <h4 className="font-bold text-slate-900">إعلان الخصوم</h4>
                  <p className="text-sm text-slate-500 mt-1">تم تسليم صحيفة الدعوى لقلم المحضرين لإعلان المدعى عليه.</p>
                </div>
                <div className="relative">
                  <div className="absolute -right-[35px] top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center animate-pulse"></div>
                  <h4 className="font-bold text-amber-600">الجلسة الأولى (قيد الانتظار)</h4>
                  <p className="text-sm text-slate-600 mt-1">سيتم تقديم حوافظ المستندات وسماع أقوال محامي الخصم.</p>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mt-3 inline-flex items-center gap-2 text-amber-800 text-sm font-bold">
                    <Clock className="w-4 h-4" /> موعد الجلسة: 25 أكتوبر 2026
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -right-[35px] top-0 w-6 h-6 bg-slate-200 rounded-full border-4 border-white shadow-sm"></div>
                  <h4 className="font-bold text-slate-400">حجز الدعوى للحكم</h4>
                  <p className="text-sm text-slate-400 mt-1">في انتظار انتهاء المرافعات لحجز القضية للحكم.</p>
                </div>
              </div>
            </div>
          </div>

          {/* العمود الأيسر (صندوق الشات الفوري) - هيظهر مسطرة المرة دي */}
          <div className="lg:col-span-1 bg-white border border-amber-200/60 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[650px]">
            <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold"><MessageSquare className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-sm text-white">المحادثة المباشرة</h3>
                <p className="text-[11px] text-amber-400 font-medium">خط ساخن مع إدارة المكتب</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8fafc]">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
                  <MessageSquare className="w-10 h-10 mb-3 opacity-30 text-amber-500" />
                  <p className="text-sm font-bold text-slate-700">تواصل مباشر مع الإدارة</p>
                  <p className="text-xs text-slate-500 mt-1">اكتب استفسارك وسيرد عليك الأستاذ فوراً.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isMine ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${msg.isMine ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"}`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        {msg.isMine && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <input type="text" placeholder="اكتب رسالتك هنا..." className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium" value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" disabled={!input.trim()} className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-md"><Send className="w-5 h-5 rotate-180" /></button>
            </form>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================
  // ⚖️ 2. شاشة المحامين والمديرين (بدون تغيير)
  // =========================================================
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-500 ${isCheckedIn ? 'bg-emerald-500' : 'bg-slate-800'}`}><Clock className="w-6 h-6" /></div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">سجل الدوام اليومي للمكتب</h3>
            <p className="text-slate-500 text-sm">{isCheckedIn ? `تم تسجيل حضورك الساعة ${checkInTime}` : 'لم تقم بتسجيل الدخول لليوم حتى الآن.'}</p>
          </div>
        </div>
        <button onClick={() => { setIsCheckedIn(!isCheckedIn); setCheckInTime(new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })); }} className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md w-full md:w-auto ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
          {isCheckedIn ? 'تسجيل الانصراف 🏃‍♂️' : 'تسجيل الحضور ✋'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"><Briefcase className="w-10 h-10 text-amber-500" /><div><p className="text-sm text-slate-500 font-bold">القضايا النشطة</p><p className="text-2xl font-black text-slate-950 mt-1">12 قضية</p></div></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"><Users className="w-10 h-10 text-blue-500" /><div><p className="text-sm text-slate-500 font-bold">إجمالي الموكلين</p><p className="text-2xl font-black text-slate-950 mt-1">48 موكل</p></div></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"><Wallet className="w-10 h-10 text-emerald-500" /><div><p className="text-sm text-slate-500 font-bold">الماليات المعلقة</p><p className="text-2xl font-black text-slate-950 mt-1">15,400 ج.م</p></div></div>
      </div>
    </div>
  );
}