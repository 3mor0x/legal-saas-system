"use client";

import { Users, Plus, Mail, Phone, Shield, FileText, MoreHorizontal } from "lucide-react";

export default function ClientsPage() {
  const clientsList = [
    { id: "C-101", name: "أحمد محمد السيد", nationalId: "29408212101456", phone: "01012345678", casesCount: "3 قضايا", status: "نشط" },
    { id: "C-102", name: "شركة المقاولات العربية والتوحيد", nationalId: "سجل تجاري: 45210", phone: "01098765432", casesCount: "1 قضية", status: "نشط" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            سجل الموكلين والعملاء <Users className="w-7 h-7 text-amber-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">قاعدة بيانات الموكلين، أرقام الهوية، وربطهم بالملفات السحابية والقضائية.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#040814] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg text-sm">
          <Plus className="w-4 h-4" /> إضافة موكل جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* اليمين: قائمة الموكلين */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/20">
            <h2 className="text-lg font-bold text-slate-900 mb-6">قاعدة بيانات السادة الموكلين</h2>
            <div className="space-y-4">
              {clientsList.map((client) => (
                <div key={client.id} className="p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm transition-all flex flex-col md:flex-row gap-5 relative">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base md:text-lg font-black text-slate-900">{client.name}</h3>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">{client.status}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                        <Shield className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 leading-none">الرقم القومي / السجل</p>
                          <p className="text-xs font-bold text-slate-700 mt-1">{client.nationalId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                        <Phone className="w-4 h-4 text-amber-500" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 leading-none">رقم التليفون المباشر</p>
                          <p className="text-xs font-black text-slate-800 mt-1" dir="ltr">{client.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* الشمال: كارت إرشادي */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">توكيلات معلقة إدارياً</h3>
            <p className="text-xs text-slate-500 leading-relaxed">يوجد عدد 2 توثيق في مكاتب الشهر العقاري بديروط بانتظار المراجعة القانونية لإضافتهم للسيستم.</p>
          </div>
        </div>
      </div>
    </div>
  );
}