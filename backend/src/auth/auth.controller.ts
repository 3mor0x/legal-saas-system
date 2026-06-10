// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Res, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. مسار تسجيل الحساب التقليدي (اسم، هاتف، إيميل، كلمة مرور)
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  // 2. المسار الذي يستدعيه الفرونت إند لبدء عملية التحقق عبر جوجل
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // الحارس (Guard) يقوم تلقائياً بتوجيه المستخدم إلى خوادم جوجل المختصة
  }

  // 3. مسار الـ Callback الذي تعود إليه خوادم جوجل بالبيانات لتسجيلها وعمل الـ Redirect
  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }
}