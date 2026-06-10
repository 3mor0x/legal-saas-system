// src/documents/documents.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async uploadDocument(data: {
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    uploadedById: string;
    caseId?: string;
  }) {
    return await this.prisma.document.create({
      data: {
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        fileSize: data.fileSize,
        fileType: data.fileType,
        uploadedById: data.uploadedById,
        caseId: data.caseId,
      },
    });
  }
}