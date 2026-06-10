// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { deleteCookie } from "cookies-next";
import { 
  Scale, LayoutDashboard, Briefcase, Users, CalendarClock, 
  FileText, Settings, LogOut, Archive, X, MessageSquare // 👈 استيراد أيقونة الرسائل
} from "lucide-react";

// تعريف الـ Props عشان نتحكم في القائمة من الموبايل
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
}

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore(); // 👈 جلب بيانات اليوزر

  if (!user) return null;

  // 🛡️ دالة تسجيل الخروج
  const handleLogout = () => {
    deleteCookie("token");
    logout();
    router.push("/login");
  };

  // 🛡️ الروابط والصلاحيات (RBAC)
  const sidebarLinks = [
    { name: "اللوحة الرئيسية", href: "/dashboard", icon: LayoutDashboard, roles: ["OFFICE_OWNER", "LAWYER", "SECRETARY"] },
    { name: "إدارة القضايا", href: "/dashboard/cases", icon: Briefcase, roles: ["OFFICE_OWNER", "LAWYER"] },
    { name: "سجل الموكلين", href: "/dashboard/clients", icon: Users, roles: ["OFFICE_OWNER", "SECRETARY", "LAWYER"] },
    { name: "الجلسات والمواعيد", href: "/dashboard/sessions", icon: CalendarClock, roles: ["OFFICE_OWNER", "LAWYER", "SECRETARY"] },
    { name: "الأرشيف الرقمي", href: "/dashboard/archive", icon: Archive, roles: ["OFFICE_OWNER", "LAWYER"] },
    { name: "صندوق الرسائل", href: "/dashboard/messages", icon: MessageSquare, roles: ["OFFICE_OWNER", "LAWYER", "CLIENT"] }, // 👈 زرار الشات الجديد
    { name: "الماليات والفواتير", href: "/dashboard/invoices", icon: FileText, roles: ["OFFICE_OWNER"] }, // للإدارة فقط
    { name: "إعدادات النظام", href: "/dashboard/settings", icon: Settings, roles: ["OFFICE_OWNER"] }, // للإدارة فقط
  ];

  // فلترة الروابط حسب دور المستخدم
  const filteredLinks = sidebarLinks.filter(link => link.roles.includes(user.role));

  return (
    <>
      {/* خلفية ضبابية (Backdrop) للموبايل */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#040814]/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* القائمة الجانبية */}
      <aside 
        className={`w-72 bg-[#040814] border-l border-slate-800/80 flex flex-col fixed top-0 right-0 h-full z-50 shadow-2xl transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
      >
        {/* هيدر القائمة */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-transparent rounded-xl border border-amber-500/20">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-white font-black text-base tracking-tight leading-tight">المنصة الرقمية</h2>
              <p className="text-amber-500 text-xs font-bold mt-1">
                {user.role === 'OFFICE_OWNER' ? 'إدارة المكتب' : (user.role === 'LAWYER' ? 'مساحة المحامين' : 'السكرتارية')}
              </p>
            </div>
          </div>
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* الروابط المفلترة */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto custom-scrollbar">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link 
                key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
                  isActive ? "bg-gradient-to-l from-amber-500/10 to-transparent text-amber-500 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-white/5 font-medium"
                }`}
              >
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-amber-500 rounded-l-full shadow-[0_0_15px_rgba(245,158,11,0.6)]"></div>}
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* معلومات المستخدم وتسجيل الخروج */}
        <div className="p-4 border-t border-slate-800/80 bg-[#02050e]">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-white/5 rounded-xl border border-white/5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-[#040814] flex items-center justify-center font-black text-base shrink-0">
              {user.name.charAt(0)} {/* 👈 أول حرف من اسم المستخدم */}
            </div>
            <div className="overflow-hidden">
              <p className="text-slate-200 font-bold text-sm truncate">أ. {user.name}</p>
              <p className="text-slate-500 text-[11px] font-medium mt-0.5 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-xs uppercase tracking-wider">
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
        </div>
      </aside>
    </>
  );
}