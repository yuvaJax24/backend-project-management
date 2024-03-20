import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  getAllChatData() {
    console.log('object-chat-saved');
  }

  saveChatData(chatData: CreateChatDto) {
    console.log('object-chat-saved', chatData);
  }

  getChatDataByEmployeeId(id: number) {
    console.log('object-chat-by-id', id);
  }

  deleteChatDataByEmployeeId(id: number) {
    console.log('object-delete-chat', id);
  }
}
