import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: '*' })
export class ChatGateway implements OnModuleInit {
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', () => {
      console.log('Socket Connected');
    });
  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() data: any) {
    await this.chatService.saveChatData(data);
    await this.server.emit('send-message', data);
  }
}
