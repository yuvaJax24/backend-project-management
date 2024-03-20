import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: '*' })
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', () => {
      console.log('Socket Connected');
    });
  }

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() data: any) {
    console.log('data', data);
    this.server.to(data?.id).emit('send-message', data);
  }

  @SubscribeMessage('join-chat')
  joinChatRoom(@MessageBody() data: any) {
    console.log('data', data);
    this.server.emit('join-chat', data);
  }
}
