import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'; // 👈 استيراد مكتبة التوكن
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  // 🛠️ التعديل هنا: حقن الـ JwtService
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password',
    },
  });

  async register(data: any) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new BadRequestException('هذا البريد الإلكتروني مسجل بالفعل!');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        fullName: data.name, 
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: 'OFFICE_OWNER',
        isVerified: false,
      },
    });

    const verificationLink = `http://localhost:3001/verify?email=${newUser.email}`;
    await this.transporter.sendMail({
      from: '"المنصة الرقمية للمحاماة" <no-reply@legal.com>',
      to: newUser.email,
      subject: 'تأكيد حسابك في المنصة الرقمية',
      html: `<h2>مرحباً أستاذ ${newUser.fullName}</h2><a href="${verificationLink}">تفعيل الحساب</a>`,
    });

    return { message: 'تم إنشاء الحساب بنجاح. يرجى مراجعة بريدك الإلكتروني للتفعيل.' };
  }

  // ==========================================
  // 🚀 دالة الدخول بجوجل النهائية
  // ==========================================
  // ==========================================
  // 🚀 دالة الدخول بجوجل النهائية (بتقنية Upsert)
  // ==========================================
  async googleLogin(req, res) {
    if (!req.user) {
      return res.redirect('http://localhost:3001/login?error=GoogleAuthFailed');
    }

    const { email, firstName, lastName } = req.user;

    // استخدام upsert عشان نمنع الـ Race Conditions نهائياً
    const user = await this.prisma.user.upsert({
      where: { email: email },
      update: {}, // لو الحساب موجود بالفعل، متعملش أي تعديل، بس هاتهولي
      create: {   // لو مش موجود، كاريته فوراً
        fullName: `${firstName} ${lastName}`,
        email: email,
        password: '', // بدون باسورد
        isVerified: true, 
        role: 'CLIENT', 
      },
    });

    // إنشاء توكن الأمان (JWT)
    const payload = { sub: user.id, email: user.email, role: user.role, name: user.fullName };
    const token = await this.jwtService.signAsync(payload);

    // تحويل (Redirect) للفرونت إند ومعانا التوكن في الرابط
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    return res.redirect(`${frontendUrl}/dashboard?token=${token}`);  }
}