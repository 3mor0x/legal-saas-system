// src/app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // هنا هنربطها بالـ API بتاع الباك إند بعدين
    setTimeout(() => {
      setIsSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">نسيت كلمة المرور؟ 🔒</h1>
              <p className="text-slate-500">أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email" type="email" placeholder="name@elite-law.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={loading}>
                {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MailCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">تحقق من بريدك الإلكتروني!</h2>
            <p className="text-slate-500">تم إرسال تعليمات استعادة كلمة المرور إلى <br/><span className="font-bold text-slate-800">{email}</span></p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/login" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 transition-colors">
            <ArrowRight className="w-4 h-4" /> العودة لتسجيل الدخول
          </Link>
        </div>
      </Card>
    </div>
  );
}