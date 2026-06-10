// src/documents/documents.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { diskStorage } from 'multer';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // المجلد اللي هيتحفظ فيه الملفات محلياً
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Req() req: any) {
    return this.documentsService.uploadDocument({
      fileName: file.originalname,
      fileUrl: `/uploads/${file.filename}`,
      fileSize: file.size,
      fileType: file.mimetype,
      uploadedById: body.uploadedById, // ده هنجيبه من الـ User Token بعدين
      caseId: body.caseId,
    });
  }
}