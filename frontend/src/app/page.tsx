import Link from "next/link";
/* eslint-disable react/no-unescaped-entities */
import { 
  Scale, 
  Shield, 
  Briefcase, 
  Users, 
  MessageSquare, 
  CalendarClock, 
  ChevronLeft, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  FileText, 
  Building2,
  ArrowUpLeft,
  Sparkles
} from "lucide-react";

// أيقونة الفيسبوك المبرمجة
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// أيقونة الواتساب المبرمجة
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

export default function UltraPremiumLawPortal() {
  const mapUrl = "https://goo.gl/maps/ynBu3D8Yd7eXEfQe7?g_st=ac";
  const facebookUrl = "https://www.facebook.com/share/18rZhVZAjy/";
  const phoneNumber = "01064684164";
  const whatsappUrl = `https://wa.me/201064684164`;
  const developerWhatsapp = "https://wa.me/201009694831"; // لينك الواتساب بتاعك يا هندسة

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-amber-500/30">
      
      {/* 1. الشريط العلوي (الأسود العميق) */}
      <div className="bg-[#040814] text-slate-300 py-2.5 text-xs md:text-sm border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors group">
            <MapPin className="w-4 h-4 text-amber-500 group-hover:animate-bounce" />
            <span>أسيوط - ديروط - ميدان أبوجبل - أعلي مطعم العجمي</span>
          </a>
          <div className="flex items-center gap-6">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <FacebookIcon className="w-4 h-4" /> <span className="hidden sm:inline font-medium">الصفحة الرسمية</span>
            </a>
            <div className="w-px h-4 bg-slate-800 hidden sm:block"></div>
            <a href={`tel:${phoneNumber}`} className="hover:text-amber-400 transition-colors flex items-center gap-2 font-bold tracking-wider" dir="ltr">
              <PhoneCall className="w-4 h-4 text-amber-500" /> 010 6468 4164
            </a>
          </div>
        </div>
      </div>

      {/* 2. الهيدر الرئيسي (زجاجي) */}
      <nav className="bg-white/70 backdrop-blur-2xl shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative p-3 bg-gradient-to-br from-[#0B1120] to-[#1a233a] rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300 border border-slate-700/50">
                <Scale className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                مكتب الأستاذ / محمود شعبان داخلي
              </h1>
              <p className="text-amber-600 text-sm font-bold mt-1 tracking-wide">
                للمحاماة والاستشارات القانونية
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* 3. القسم الترحيبي (درامي وفخم جداً) */}
      <section className="relative bg-[#040814] pt-28 pb-56 px-4 overflow-hidden">
        {/* إضاءات خلفية (Glow Effects) */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-semibold mb-10 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <Sparkles className="w-4 h-4 text-amber-300" /> البوابة القانونية الذكية
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.2] md:leading-[1.15]">
            الصرح القانوني الرقمي <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              لإدارة القضايا والدعاوى
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
            منظومة إلكترونية متطورة تعكس عراقة العمل القضائي وتواكب الكفاءة الرقمية الحديثة، لتأمين مستنداتكم وتسهيل المتابعة الفورية.
          </p>
        </div>
      </section>

      {/* 4. البوابات (كروت زجاجية تطفو بشكل مبهر) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 -mt-36 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* الإدارة */}
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-1 shadow-2xl shadow-slate-200/50 hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 -z-10 blur-sm"></div>
            <div className="bg-white rounded-[1.8rem] p-8 h-full flex flex-col items-center text-center border border-slate-100 relative overflow-hidden">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors duration-500 group-hover:rotate-6 shadow-sm border border-slate-100">
                <Shield className="w-10 h-10 text-slate-800 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">بوابة الإدارة العليا</h3>
              <p className="text-slate-500 mb-10 flex-1 leading-relaxed">تحكم شامل في ملفات الدعاوى، المراقبة الدقيقة لعمل السادة المحامين، وإدارة الموكلين.</p>
              <Link href="/login?role=admin" className="w-full flex items-center justify-center gap-2 bg-[#040814] hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-slate-900/20">
                دخول الإدارة <ArrowUpLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* المحامين */}
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-1 shadow-2xl shadow-slate-200/50 hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 -z-10 blur-sm"></div>
            <div className="bg-white rounded-[1.8rem] p-8 h-full flex flex-col items-center text-center border border-slate-100 relative overflow-hidden">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#040814] transition-colors duration-500 group-hover:-rotate-6 shadow-sm border border-slate-100">
                <Briefcase className="w-10 h-10 text-slate-800 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">بوابة السادة المحامين</h3>
              <p className="text-slate-500 mb-10 flex-1 leading-relaxed">الولوج الفوري لملفات القضايا الموكلة إليكم، أرشفة مذكرات الدفاع، وتحديث الجلسات.</p>
              <Link href="/login?role=lawyer" className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-900 font-bold py-4 rounded-xl transition-all">
                دخول المحامين <ArrowUpLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* الموكلين */}
          <div className="group relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-1 shadow-2xl shadow-slate-200/50 hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 -z-10 blur-sm"></div>
            <div className="bg-white rounded-[1.8rem] p-8 h-full flex flex-col items-center text-center border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-br-2xl shadow-md">مخصص للموكل</div>
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 mt-2 group-hover:bg-[#040814] transition-colors duration-500 group-hover:scale-110 shadow-sm border border-slate-100">
                <Users className="w-10 h-10 text-slate-800 group-hover:text-amber-400 transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">بوابة الموكلين</h3>
              <p className="text-slate-500 mb-10 flex-1 leading-relaxed">مساحة آمنة لحجز مواعيد الاستشارات، والمحادثة الكتابية الخاصة والمباشرة مع المكتب.</p>
              <Link href="/login?role=client" className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-900 font-bold py-4 rounded-xl transition-all">
                دخول الموكلين <ArrowUpLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. عن المكتب والتخصصات */}
      <section className="bg-white py-32 px-4 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* الجانب الأيمن: عن المكتب */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-bold tracking-wide border border-amber-100">
              <Building2 className="w-4 h-4" /> عن الصرح القانوني للمكتب
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              عدالة موثوقة، <br />ودفاع <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">لا يتهاون</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
              يضم المكتب نخبة من المحامين ذوي الخبرة الكبيرة والكفاءة العالية في مختلف فروع ومناحي القانون. نؤمن يقيناً بأن لكل موكّل قضية تستحق العناية القصوى والاحترافية المطلقة، ونحرص دائماً على تقديم حلول قانونية متكاملة تحفظ الحقوق وتُحقّق العدالة الناجزة.
            </p>
            <div className="space-y-5 pt-4">
              {[
                "سرية تامة ومطلقة في التعامل مع القضايا",
                "متابعة إدارية وقانونية مستمرة حتى صدور الحكم",
                "استشارات قانونية واضحة وصريحة ومباشرة"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-amber-200 transition-colors">
                  <div className="bg-emerald-100 p-1.5 rounded-full shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-bold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* الجانب الأيسر: التخصصات (كارت داكن مبهر) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 translate-x-4 translate-y-4 rounded-[2.5rem] opacity-70 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
            <div className="relative bg-[#040814] text-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-slate-800">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 shadow-inner">
                <Scale className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-wide">نطاق التخصصات القضائية</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                نقدّم خدمات قانونية شاملة ومتكاملة تغطي جميع احتياجات موكّلينا الكرام، ونسجل تمثيلنا القضائي الراسخ لدى:
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  "المحاكم الابتدائية والجنائية",
                  "محاكم أمن الدولة العليا",
                  "محاكم الأسرة والأحوال الشخصية"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-bold text-slate-200">
                    <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.9)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-5 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl border border-amber-500/20">
              <p className="text-amber-400 font-medium leading-relaxed italic">
            &quot;نقدّم استشارات قانونية احترافية ودفاعاً متيناً يحفظ ويصون حقوق موكلينا.&quot;
          </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. خدمات النظام */}
      <section className="py-32 bg-[#F8FAFC] px-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">خدمات البوابة الإلكترونية للمكتب</h2>
            <p className="text-slate-500 text-lg">التحول الرقمي الآمن لخدمة قضاياكم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-blue-200 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">محادثات الموكلين المشفرة</h3>
              <p className="text-slate-600 text-lg leading-relaxed">قناة تواصل مشفرة تتيح للموكل إرسال الاستفسارات والمستندات بخصوص قضيته، واستلام الردود مباشرة وبسرية.</p>
            </div>

            <div className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-amber-200 transition-all duration-300">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">مراسلات الطاقم الداخلي</h3>
              <p className="text-slate-600 text-lg leading-relaxed">نظام محادثات داخلي وسري يربط السادة محامين المكتب بالإدارة العليا لتلقي التوجيهات ومشاركة محاضر الجلسات فوراً.</p>
            </div>

            <div className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-emerald-200 transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CalendarClock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">طلب وجدولة المواعيد</h3>
              <p className="text-slate-600 text-lg leading-relaxed">إمكانية طلب وحجز مواعيد للاستشارات والاجتماعات للموكلين عبر بوابتهم بسهولة وتنظيمها ضمن أجندة المكتب الحية.</p>
            </div>

            <div className="group bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-purple-200 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">التحديث الفوري للدعاوى</h3>
              <p className="text-slate-600 text-lg leading-relaxed">منظومة أرشفة متكاملة تتيح للمحامين متابعة وحفظ كافة محاضر التحقيق، مذكرات الدفاع، والقرارات الإدارية أولاً بأول.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. الفوتر الضخم */}
      <footer className="bg-[#040814] pt-24 pb-0 relative overflow-hidden">
        {/* تأثيرات خلفية الفوتر */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 pb-16">
          <div className="text-center mb-16">
            <Scale className="w-16 h-16 mx-auto text-amber-500 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              مكتب الأستاذ محمود شعبان داخلي
            </h2>
            <p className="text-slate-400 text-lg">للمحاماة والاستشارات القانونية</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-all w-full sm:w-auto backdrop-blur-sm group">
              <div className="bg-slate-800 p-2 rounded-xl group-hover:scale-110 transition-transform"><MapPin className="w-6 h-6 text-amber-500" /></div>
              <span className="text-slate-200 font-bold text-right">أسيوط - ديروط - ميدان ابوجبل</span>
            </a>

            <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-all w-full sm:w-auto backdrop-blur-sm group">
              <div className="bg-slate-800 p-2 rounded-xl group-hover:scale-110 transition-transform"><PhoneCall className="w-6 h-6 text-emerald-400" /></div>
              <span dir="ltr" className="text-slate-200 font-black tracking-widest text-lg">010 6468 4164</span>
            </a>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 px-6 py-4 rounded-2xl transition-all w-full sm:w-auto backdrop-blur-sm group">
              <div className="relative">
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                <div className="bg-green-500 p-2 rounded-xl group-hover:scale-110 transition-transform"><WhatsappIcon className="w-6 h-6 text-white" /></div>
              </div>
              <span className="text-green-400 font-bold">تواصل فوري (واتساب)</span>
            </a>

            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 px-6 py-4 rounded-2xl transition-all w-full sm:w-auto backdrop-blur-sm group">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform"><FacebookIcon className="w-6 h-6 text-white" /></div>
              <span className="text-blue-400 font-bold">تابعنا على فيسبوك</span>
            </a>
          </div>
        </div>

        {/* 8. شريط توقيع المطور (الدعاية الخاصة بيك يا هندسة) */}
        <div className="border-t border-slate-800/80 bg-[#02040A] py-5 relative z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-slate-500 font-medium">© {new Date().getFullYear()} جميع الحقوق محفوظة لمكتب أ. محمود شعبان داخلي.</p>
            
            {/* اللينك بتاعك بالواتساب */}
            <a 
              href={developerWhatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-slate-800 hover:border-slate-700"
            >
              <span>تم التصميم والتطوير بواسطة</span>
              <span className="font-black text-amber-500 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all tracking-wide">
                م. عمرو عثمان
              </span>
              <div className="bg-green-500/10 p-1.5 rounded-full group-hover:bg-green-500 transition-colors">
                <WhatsappIcon className="w-3.5 h-3.5 text-green-500 group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>
        </div>

      </footer>

    </div>
  );
}