import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 w-full md:w-[calc(100%-16rem)] fixed top-0 left-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">لوحة التحكم</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-700">المحامي / عمرو</span>
        <Avatar>
          <AvatarFallback className="bg-slate-900 text-white">ع</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}