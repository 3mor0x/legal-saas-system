"use client";

import { Settings, Shield, User, Bell, Save, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            إعدادات النظام والمنصة <Settings className="w-7 h-7 text-amber-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">تخصيص البيانات العامة للمكتب، إدارة الحماية، وحسابات الطاقم.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#040814] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg text-sm">
          <Save className="w-4 h-4" /> حفظ الإعدادات العامة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* اليمين: حقول الإعدادات الرصينة ككبسولات مجهزة */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/20 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">البيانات التعريفية للمكتب</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <label className="block text-[11px] font-bold text-slate-400 mb-2">اسم الصرح القانوني (يظهر بالهيدر والفوتر)</label>
                <input type="text" defaultValue="مكتب الأستاذ / محمود شعبان داخلي" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-amber-500" />
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <label className="block text-[11px] font-bold text-slate-400 mb-2">رقم هاتف الاتصال والواتساب المباشر</label>
                <input type="text" defaultValue="01064684164" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-amber-500" dir="ltr" />
              </div>
            </div>
          </div>
        </div>

        {/* الشمال: كارت جدار الحماية والأمان للسيستم */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto border border-emerald-100">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">جدار حماية البيانات</h3>
            <p className="text-xs text-slate-500 leading-relaxed">قاعدة البيانات مشفرة بالكامل بنظام التشفير العالمي AES-256 لحماية مذكرات الدفاع وأسماء الموكلين.</p>
          </div>
        </div>
      </div>
    </div>
  );
}