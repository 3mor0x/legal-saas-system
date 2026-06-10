"use client";

import { FileText, Plus, Wallet, ArrowUp, ArrowDown, DollarSign } from "lucide-react";

export default function InvoicesPage() {
  const invoices = [
    { id: "INV-001", client: "شركة التوحيد للمقاولات", total: "25,000", paid: "15,000", remaining: "10,000", status: "مدفوعة جزئياً" },
    { id: "INV-002", client: "حسن فهد الجبالي", total: "5,000", paid: "5,000", remaining: "0", status: "خالصة السداد" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            الماليات والفواتير <FileText className="w-7 h-7 text-amber-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">متابعة أتعاب القضايا، الدفعات المستلمة، وإصدار الفواتير القانونية للموكلين.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#040814] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg text-sm">
          <Plus className="w-4 h-4" /> إصدار فاتورة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[1.5rem] p-6 md:p-8 border border-slate-200/60 shadow-xl shadow-slate-200/20">
            <h2 className="text-lg font-bold text-slate-900 mb-6">حركة الحسابات والأتعاب</h2>
            <div className="space-y-4">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm transition-all flex flex-col md:flex-row gap-5 relative">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base md:text-lg font-black text-slate-900">{inv.client}</h3>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold border bg-blue-50 text-blue-700 border-blue-200">{inv.status}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5">
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-slate-400 leading-none">إجمالي قيمة التعاقد</p>
                          <p className="text-sm font-black text-slate-800 mt-1.5">{inv.total} ج.م</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-2.5">
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-emerald-600 leading-none">المبلغ المدفوع</p>
                          <p className="text-sm font-black text-emerald-700 mt-1.5">{inv.paid} ج.م</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-rose-50/50 border border-rose-100 rounded-xl px-4 py-2.5">
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-rose-600 leading-none">المتبقي للمكتب</p>
                          <p className="text-sm font-black text-rose-700 mt-1.5">{inv.remaining} ج.م</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* الجانب الأيسر (الشمال) */}
        <div className="space-y-6">
          <div className="bg-[#040814] text-white p-6 rounded-[1.5rem] shadow-xl relative overflow-hidden border border-slate-800">
            <h3 className="text-base font-bold text-slate-400">التقرير المالي العام</h3>
            <p className="text-3xl font-black text-amber-500 mt-4">20,000 ج.م</p>
            <p className="text-xs text-slate-500 mt-1">إجمالي المستحقات القانونية المعلقة بالخارج</p>
          </div>
        </div>
      </div>
    </div>
  );
}