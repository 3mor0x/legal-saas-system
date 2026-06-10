// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. بندور على التوكن في الكوكيز
  const cookieToken = request.cookies.get('token')?.value;
  // 2. بندور على التوكن في الرابط (الـ URL)
  const urlToken = request.nextUrl.searchParams.get('token'); 
  
  // لو التوكن موجود في أي مكان فيهم، نعتبره معاه تصريح دخول
  const token = cookieToken || urlToken;
  const path = request.nextUrl.pathname;

  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/admin');

  // لو بيحاول يدخل صفحات محمية ومعهوش توكن خالص، اطرده لصفحة اللوجن
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // لو مسجل دخول وبيحاول يروح لصفحة اللوجن، رجعه للداشبورد
  if (token && path.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login'],
};