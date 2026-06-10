"use client";

import { 
  Archive, 
  UploadCloud, 
  Search, 
  Folder, 
  FileText, 
  FileImage, 
  MoreVertical, 
  Download, 
  Trash2,
  FolderOpen
} from "lucide-react";

export default function ArchivePage() {
  // بيانات وهمية للمجلدات
  const folders = [
    { id: 1, name: "مذكرات الدفاع", count: "124 ملف", color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, name: "توكيلات الموكلين", count: "89 ملف", color: "text-amber-500", bg: "bg-amber-50" },
    { id: 3, name: "صور الأحكام", count: "45 ملف", color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 4, name: "عقود وشركات", count: "32 ملف", color: "text-purple-500", bg: "bg-purple-50" },
  ];

  // بيانات وهمية للملفات الحديثة
  const recentFiles = [
    { id: 101, name: "مذكرة_دفاع_قضية_452.pdf", size: "2.4 MB", date: "اليوم", type: "pdf", client: "شركة التوحيد" },
    { id: 102, name: "توكيل_رسمي_عام_حسن_الجبالي.jpg", size: "1.1 MB", date: "أمس", type: "image", client: "حسن الجبالي" },
    { id: 103, name: "حكم_براءة_جناية_تزوير.pdf", size: "4.8 MB", date: "منذ 3 أيام", type: "pdf", client: "أحمد محمد" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* الهيدر وزرار الرفع */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            الأرشيف الرقمي <Archive className="w-7 h-7 text-amber-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">مساحة سحابية آمنة ومشفرة لحفظ واسترجاع كافة مستندات المكتب.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#040814] hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-slate-900/20 text-sm group">
          <UploadCloud className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> رفع ملف جديد
        </button>
      </div>

      {/* شريط البحث */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="ابحث عن اسم ملف، موكل، أو رقم قضية..." 
          className="flex-1 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* المجلدات الأساسية */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-amber-500" /> التصنيفات الرئيسية
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${folder.bg} ${folder.color} group-hover:scale-110 transition-transform`}>
                <Folder className="w-6 h-6 fill-current opacity-80" />
              </div>
              <h3 className="font-bold text-slate-800">{folder.name}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{folder.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* الملفات المضافة مؤخراً */}
      <div className="bg-white rounded-[1.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">أحدث المستندات</h2>
          <button className="text-xs font-bold text-amber-600 hover:text-amber-700">عرض الكل</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs border-b border-slate-100">
                <th className="p-4 font-bold">اسم الملف</th>
                <th className="p-4 font-bold">المرجع (الموكل/القضية)</th>
                <th className="p-4 font-bold">الحجم</th>
                <th className="p-4 font-bold">تاريخ الرفع</th>
                <th className="p-4 font-bold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.map((file) => (
                <tr key={file.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        {file.type === 'pdf' ? <FileText className="w-5 h-5" /> : <FileImage className="w-5 h-5" />}
                      </div>
                      <span className="font-bold text-sm text-slate-700 group-hover:text-amber-600 transition-colors cursor-pointer" dir="ltr">{file.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-slate-500">{file.client}</td>
                  <td className="p-4 text-xs font-medium text-slate-500">{file.size}</td>
                  <td className="p-4 text-xs font-medium text-slate-500">{file.date}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="تحميل">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}