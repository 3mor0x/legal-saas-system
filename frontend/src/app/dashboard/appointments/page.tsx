"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, MapPin, Scale } from "lucide-react";
import { useState } from "react";

// داتا وهمية للمواعيد والجلسات
const dummyAppointments = [
  {
    id: "1",
    title: "جلسة نطق بالحكم - قضية تعويضات",
    clientName: "محمد أحمد إبراهيم",
    time: "09:00 صباحاً",
    location: "محكمة القاهرة الجديدة - الدائرة الخامسة",
    type: "جلسة محكمة",
    date: new Date(), // تاريخ النهارده
  },
  {
    id: "2",
    title: "استشارة قانونية وتوقيع عقود",
    clientName: "شركة الأمل للتجارة",
    time: "01:30 مساءً",
    location: "مقر المكتب الرئيسي",
    type: "اجتماع موكل",
    date: new Date(),
  },
  {
    id: "3",
    title: "تقديم مذكرات دفاع",
    clientName: "سارة محمود علي",
    time: "11:00 صباحاً",
    location: "محكمة مصر الجديدة",
    type: "إجراء إداري",
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // بكره
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "جلسة محكمة":
      return "bg-red-100 text-red-700 border-red-200";
    case "اجتماع موكل":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      {/* الهيدر */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">المواعيد والجلسات</h2>
          <p className="text-slate-500 text-sm mt-1">إدارة جدول أعمالك ومواعيد المحاكم</p>
        </div>
        <Button className="gap-2 bg-slate-900 hover:bg-slate-800">
          <Plus className="w-4 h-4" /> حجز موعد جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* عمود التقويم (على اليمين) */}
        <div className="md:col-span-1">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold text-slate-800">تقويم الجلسات</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </CardContent>
          </Card>
        </div>

        {/* عمود تفاصيل المواعيد (على الشمال) */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            مواعيد يوم {date?.toLocaleDateString("ar-EG", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          
          {dummyAppointments.map((appt) => (
            <Card key={appt.id} className="border-slate-200 shadow-sm hover:border-slate-300 transition-all">
              <CardContent className="p-5 flex flex-col md:flex-row justify-between gap-4">
                
                {/* التفاصيل الأساسية */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      {appt.type === "جلسة محكمة" ? <Scale className="w-5 h-5 text-red-600" /> : null}
                      {appt.title}
                    </h4>
                    <Badge variant="outline" className={getTypeColor(appt.type)}>
                      {appt.type}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-slate-600 font-medium">
                    الموكل: {appt.clientName}
                  </div>
                  
                  {/* الوقت والمكان */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span dir="ltr">{appt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{appt.location}</span>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}