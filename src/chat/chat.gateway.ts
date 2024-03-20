import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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
  sendMessage(@MessageBody() data: any) {
    this.server.emit('send-message', data);
    this.chatService.saveChatData(data);
  }
}
