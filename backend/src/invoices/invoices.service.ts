import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // توليد رقم فاتورة فريد (مثال: INV-1623456789)
    const invoiceNumber = `INV-${Date.now()}`; 
    
    // حساب حالة الفاتورة تلقائياً
    let currentStatus = 'UNPAID';
    if (data.paidAmount >= data.totalAmount) {
      currentStatus = 'PAID';
    } else if (data.paidAmount > 0) {
      currentStatus = 'PARTIALLY_PAID';
    }

    return this.prisma.invoice.create({
      data: {
        invoiceNumber,
        title: data.title,
        totalAmount: data.totalAmount,
        paidAmount: data.paidAmount || 0,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        clientId: data.clientId, // الفاتورة بتتربط بالموكل
        status: currentStatus as any, 
      },
    });
  }

  async findAll(officeId: string) {
    // 💡 سحر Prisma: هنجيب الفواتير اللي تبع موكلين جوه المكتب بتاعنا بس
    return this.prisma.invoice.findMany({
      where: {
        client: {
          officeId: officeId 
        }
      },
      include: {
        client: { select: { name: true, phone: true } } // نجيب اسم الموكل ورقمه مع الفاتورة
      },
      orderBy: { createdAt: 'desc' } // الأحدث أولاً
    });
  }
}