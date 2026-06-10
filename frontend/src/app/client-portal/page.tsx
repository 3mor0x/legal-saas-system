// src/app/client-portal/page.tsx
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { 
  LogOut, Scale, CalendarPlus, FilePlus, 
  CheckCircle2, Clock, Send, MessageSquare, CheckCheck 
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export default function ClientPortalPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  
  // States الخاصة بالشات
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    deleteCookie("token");
    logout();
    router.push("/login");
  };

  // 1. 🌐 الاتصال بالـ WebSocket فور فتح البوابة
  useEffect(() => {
    if (!user) return;

    // الاتصال بسيرفر الشات
    socket = io("http://localhost:3000");

    // الدخول في الغرفة الخاصة بالموكلين
    socket.emit("joinRoom", { userId: "CLIENT" });

    // استقبال رسائل المدير
    socket.on("newMessage", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // عمل سكرول تلقائي لآخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. 📩 دالة إرسال الرسالة للمدير مباشرة
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      senderId: "CLIENT",
      senderName: user?.name || "الموكل",
      receiverId: "OFFICE_OWNER", // 👈 الرسالة بتروح لغرفة صاحب المكتب علطول
      text: input,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    socket.emit("privateMessage", newMsg);
    setMessages((prev) => [...prev, { ...newMsg, isMine: true }]);
    setInput("");
  };

  if (!user) return null;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans pb-10">
      
      {/* هيدر البوابة */}
      <header className="bg-slate-900 text-white py-6 px-4 md:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 shadow-lg">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">بوابة الموكلين الرقمية</h1>
              <p className="text-amber-400 text-sm font-medium mt-1">أهلاً بك، أ. {user.name}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-slate-300 px-5 py-2.5 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-8 px-4 md:px-8 space-y-8 animate-in fade-in duration-700">
        
        {/* إجراءات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0"><CalendarPlus className="w-7 h-7" /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">طلب موعد استشارة 📅</h3>
              <p className="text-sm text-slate-500 mt-1">احجز موعداً لمناقشة تفاصيل قانونية جديدة.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0"><FilePlus className="w-7 h-7" /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">طلب رفع دعوى جديدة ⚖️</h3>
              <p className="text-sm text-slate-500 mt-1">ابدأ إجراءات قضية جديدة وسيتواصل معك الفريق القانوني.</p>
            </div>
          </div>
        </div>

        {/* 💻 تقسيم الشاشة: خط سير القضية (يمين) + الشات المباشر مع المكتب (يسار) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. مسار القضية (يأخذ 2/3 من المساحة في الشاشات الكبيرة) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">مسار القضية الحالية</h2>
                  <p className="text-slate-500 text-sm mt-1">دعوى تعويض - رقم 945589 لسنة 2026</p>
                </div>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold">متداولة</span>
              </div>

              <div className="relative border-r-2 border-slate-100 pr-6 space-y-8">
                <div className="relative">
                  <div className="absolute -right-[35px] top-0 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                  <h4 className="font-bold text-slate-900">قيد وتسجيل الدعوى</h4>
                  <p className="text-sm text-slate-500 mt-1">تم تسجيل القضية بنجاح بالمحكمة الابتدائية المختصة.</p>
                </div>
                <div className="relative">
                  <div className="absolute -right-[35px] top-0 w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center animate-pulse"></div>
                  <h4 className="font-bold text-amber-600">في انتظار تحديد الجلسة الأولى</h4>
                  <p className="text-sm text-slate-600 mt-1">يقوم قلم الكتاب الآن بجدولة مواعيد الدائرة القضائية وبمجرد صدور الموعد سيتم تحديثه هنا فوراً.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 💬 صندوق الشات الفوري المباشر مع صاحب المكتب */}
          <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[480px]">
            {/* هيدر الشات للموكل */}
            <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">المحادثة المباشرة</h3>
                <p className="text-[11px] text-amber-400 font-medium">خط ساخن مع صاحب المكتب</p>
              </div>
            </div>

            {/* رسائل الشات */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
                  <MessageSquare className="w-10 h-10 mb-2 opacity-30" />
                  <p className="text-xs font-bold">تواصل مباشر مع محاميك</p>
                  <p className="text-[11px] mt-0.5">اكتب استفسارك وسيرد عليك الأستاذ فوراً.</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isMe = msg.isMine;
                  return (
                    <div key={index} className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
                        isMe ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                      }`}>
                        <p className="text-xs font-medium leading-relaxed">{msg.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-blue-400" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* فورم الكتابة */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex gap-2">
              <input 
                type="text" 
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-sm"
              >
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>

          </div>

        </div>

      </main>
    </div>
  );
}