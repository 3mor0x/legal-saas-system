// src/app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Scale, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // حفظ التوكن وبيانات اليوزر
        setCookie("token", data.access_token);
        setAuth(data.user, data.access_token);
        
        // التوجيه للوحة التحكم
        router.push("/dashboard");
      } else {
        setError(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch (err) {
      setError("فشل الاتصال بالسيرفر");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // التوجيه المباشر لسيرفر الباك إند (بورت 3000)
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 flex">
      
      {/* القسم الأيمن: Branding */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900">
              <Scale className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black">المنصة الرقمية</h1>
          </div>
          <h2 className="text-4xl font-black leading-tight mb-6">
            مرحباً بك مجدداً في <br/>
            <span className="text-amber-500">مكتبك السحابي.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            سجل دخولك لمتابعة قضاياك، إدارة الجلسات، والتواصل مع موكليك بأمان.
          </p>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
            <p className="font-medium text-slate-300">اتصال مشفر ومحمي بالكامل</p>
          </div>
        </div>
      </div>

      {/* القسم الأيسر: فورم الدخول */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6">
              <ArrowRight className="w-4 h-4" /> العودة للرئيسية
            </Link>
            <h2 className="text-3xl font-black text-slate-900">تسجيل الدخول</h2>
            <p className="text-slate-500 mt-2 font-medium">أدخل بياناتك للوصول إلى لوحة التحكم.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input required type="email" dir="ltr" placeholder="name@company.com" 
                  className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-3 text-sm text-right focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">كلمة المرور</label>
                <a href="#" className="text-xs font-bold text-amber-600 hover:underline">نسيت كلمة المرور؟</a>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input required type="password" dir="ltr" placeholder="••••••••" 
                  className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all mt-4 flex items-center justify-center gap-2 shadow-md">
              {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs font-bold text-slate-400 uppercase">أو</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* زرار جوجل متبرمج يروح للباك إند علطول */}
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full mt-6 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            تسجيل الدخول باستخدام Google
          </button>

          <p className="text-center mt-8 text-sm font-medium text-slate-500">
            ليس لديك حساب؟ <Link href="/register" className="text-amber-600 font-bold hover:underline">إنشاء حساب جديد</Link>
          </p>

        </div>
      </div>
    </div>
  );
}