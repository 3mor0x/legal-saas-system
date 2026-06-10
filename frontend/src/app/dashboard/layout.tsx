// src/app/dashboard/layout.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  // 💡 الحركة الذكية: لو المستخدم موكل، اعرض المحتوى علطول بدون قائمة جانبية (Sidebar)
  if (user.role === "CLIENT") {
    return (
      <div dir="rtl" className="min-h-screen bg-slate-50 font-sans">
        {children}
      </div>
    );
  }

  // لو مستخدم عادي (محامي/مدير) يعرض السايدبار الطبيعي
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans flex">
      {/* القائمة الجانبية للكمبيوتر والموبايل */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* المحتوى الرئيسي للمكتب */}
      <div className="flex-1 md:pr-72 min-w-0">
        {/* هيدر سريع للموبايل */}
        <header className="h-16 border-b border-slate-200/60 bg-white flex items-center px-4 md:hidden sticky top-0 z-30">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="p-4 md:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}