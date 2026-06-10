"use client";

import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function FileUploader({ caseId }: { caseId?: string }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caseId", caseId || "");
    formData.append("uploadedById", "6a27ad11910b0381a7b6db58"); // ده الـ ID بتاع اليوزر (مؤقتاً)

    setUploading(true);
    try {
      const res = await fetch("http://localhost:3000/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("تم رفع الملف بنجاح!");
      } else {
        alert("حدث خطأ أثناء الرفع.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-amber-500 transition-colors">
      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
        {uploading ? (
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        ) : (
          <Upload className="w-8 h-8 text-slate-400" />
        )}
        <span className="text-sm font-bold text-slate-600">
          {uploading ? "جاري الرفع..." : "اختر ملف لرفعه للأرشيف"}
        </span>
      </label>
    </div>
  );
}