// src/app/dashboard/messages/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import io, { Socket } from "socket.io-client";
import { Send, MessageSquare, User, Clock, CheckCheck } from "lucide-react";

let socket: Socket;

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // جهات الاتصال (لو مدير هيشوف المحامي والموكل، ولو محامي هيشوف المدير)
  const contacts = user?.role === 'OFFICE_OWNER' 
    ? [
        { id: "LAWYER", name: "أ. أحمد حسني (محامي)", role: "LAWYER" },
        { id: "CLIENT", name: "محمود عبد الرحمن (موكل)", role: "CLIENT" }
      ] 
    : [
        { id: "OFFICE_OWNER", name: "إدارة المكتب (المدير)", role: "OFFICE_OWNER" }
      ];

  const [activeContact, setActiveContact] = useState(contacts[0]);

  useEffect(() => {
    if (!user) return;

    // 1. الاتصال بمحطة الباك إند
    socket = io("http://localhost:3000");

    // 2. الدخول في الغرفة الخاصة بيا (استخدمنا الـ Role كاسم للغرفة عشان التجربة)
    socket.emit("joinRoom", { userId: user.role });

    // 3. استقبال الرسايل الجديدة
    socket.on("newMessage", (message: any) => {
      // نتأكد إن الرسالة جاية من الشخص اللي فاتحين الشات معاه دلوقتي
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // عشان الشاشة تنزل لتحت أوتوماتيك مع كل رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeContact) return;

    const newMsg = {
      senderId: user?.role,
      senderName: user?.name,
      receiverId: activeContact.id, // بنبعت الرسالة للغرفة بتاعت الطرف التاني
      text: input,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    // إرسال للباك إند عبر الـ WebSocket
    socket.emit("privateMessage", newMsg);

    // إضافة الرسالة في شاشتي أنا (عشان أشوفها)
    setMessages((prev) => [...prev, { ...newMsg, isMine: true }]);
    setInput("");
  };

  if (!user) return null;

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden animate-in fade-in duration-500">
      
      {/* 1. القائمة الجانبية (جهات الاتصال) */}
      <div className="w-80 bg-slate-50 border-l border-slate-200/60 flex flex-col">
        <div className="p-6 border-b border-slate-200/60 bg-white">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-500" /> الرسائل
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">تواصل مشفر وفي الوقت الفعلي.</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                activeContact.id === contact.id ? "bg-white shadow-sm border border-amber-200" : "hover:bg-slate-100 border border-transparent"
              }`}
            >
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-slate-500" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 text-sm truncate">{contact.name}</h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">{contact.role === 'OFFICE_OWNER' ? 'متصل الآن' : 'اضغط للمراسلة'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. منطقة الشات (الرسائل) */}
      <div className="flex-1 flex flex-col bg-slate-50/50 relative">
        {/* هيدر الشات */}
        <div className="h-20 bg-white border-b border-slate-200/60 flex items-center px-6 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold">
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">{activeContact.name}</h2>
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> متصل
              </p>
            </div>
          </div>
        </div>

        {/* مساحة عرض الرسائل */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((msg, index) => {
            const isMe = msg.isMine;
            return (
              <div key={index} className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm relative ${
                  isMe ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                }`}>
                  {!isMe && <p className="text-xs font-bold text-amber-600 mb-1">{msg.senderName}</p>}
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-2 text-[10px] ${isMe ? "text-slate-400" : "text-slate-400"}`}>
                    <Clock className="w-3 h-3" /> {msg.timestamp || new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-400 ml-1" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* صندوق كتابة الرسالة */}
        <div className="p-4 bg-white border-t border-slate-200/60">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input 
              type="text" 
              placeholder={`اكتب رسالة إلى ${activeContact.name}...`}
              className="flex-1 bg-slate-100 border-none rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 w-14 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              <Send className="w-6 h-6 rotate-180" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}