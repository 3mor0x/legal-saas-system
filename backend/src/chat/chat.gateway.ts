import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // 👈 بنسمح لأي واجهة تتصل بيه (أثناء التطوير)
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // أول ما اليوزر يفتح الصفحة
  handleConnection(client: Socket) {
    console.log(`🟢 عميل متصل: ${client.id}`);
  }

  // أول ما اليوزر يقفل الصفحة
  handleDisconnect(client: Socket) {
    console.log(`🔴 عميل غير متصل: ${client.id}`);
  }

  // 1. دالة تسجيل الدخول للغرفة الخاصة باليوزر (بتتنده أول ما اليوزر يفتح الواجهة)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.userId); // اليوزر بيدخل غرفة باسم الـ ID بتاعه
    console.log(`🔒 اليوزر ${data.userId} دخل غرفته الخاصة`);
  }

  // 2. دالة إرسال رسالة خاصة (Private Message)
  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    @MessageBody() data: { senderId: string; receiverId: string; text: string; senderName: string },
  ) {
    console.log(`📩 رسالة من ${data.senderName} إلى ${data.receiverId}: ${data.text}`);
    
    // بنبعت الرسالة لغرفة الشخص المُستلم بس (عشان تبقى برايفت)
    this.server.to(data.receiverId).emit('newMessage', {
      senderId: data.senderId,
      senderName: data.senderName,
      text: data.text,
      timestamp: new Date().toISOString(),
    });
  }
}