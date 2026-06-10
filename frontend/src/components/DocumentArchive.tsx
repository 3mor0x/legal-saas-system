"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Loader2, Download, File, Image as ImageIcon } from "lucide-react";

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  createdAt: string;
}

export default function DocumentArchive({ caseId }: { caseId: string }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // 1. دالة لجلب الملفات من الباك إند
  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/case/${caseId}`);
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoadingDocs(false);
    }
  };

  // أول ما الكومبوننت يفتح، يجيب الملفات
  useEffect(() => {
    fetchDocuments();
  }, [caseId]);

  // 2. دالة رفع ملف جديد
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caseId", caseId);
    formData.append("uploadedById", "6a27ad11910b0381a7b6db58"); // ID للتجربة

    setUploading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // لو الرفع نجح، نحدث لستة الملفات فوراً
        fetchDocuments();
      } else {
        alert("حدث خطأ أثناء الرفع.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // دالة صغيرة لتحويل حجم الملف لشكل مقروء (KB, MB)
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* 🚀 منطقة الرفع (Drag & Drop UI) */}
      <div className="border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors">
        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          ) : (
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-sm">
              <Upload className="w-6 h-6" />
            </div>
          )}
          <div>
            <span className="text-base font-bold text-slate-700 block">
              {uploading ? "جاري تشفير ورفع الملف..." : "اضغط هنا لاختيار ملف ورفعه"}
            </span>
            <span className="text-xs text-slate-400 mt-1 block">يدعم PDF, PNG, JPG, DOCX</span>
          </div>
        </label>
      </div>

      {/* 📂 عرض الملفات المرفوعة */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-500" />
          مستندات القضية المرفوعة
        </h3>

        {loadingDocs ? (
          <div className="flex justify-center p-6"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
        ) : documents.length === 0 ? (
          <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-sm font-medium">
            لا توجد ملفات مرفوعة في هذه القضية حتى الآن.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    {doc.fileType.includes("image") ? <ImageIcon className="w-5 h-5" /> : <File className="w-5 h-5" />}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-800 truncate" dir="ltr">{doc.fileName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatBytes(doc.fileSize)} • {new Date(doc.createdAt).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                
                {/* زرار التحميل */}
                <a 
                  href={`${process.env.NEXT_PUBLIC_API_URL}${doc.fileUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-600 rounded-full flex items-center justify-center transition-colors shrink-0"
                  title="تحميل الملف"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}