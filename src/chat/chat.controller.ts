import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @Get()
  async getAllChatData() {
    return this.chatService.getAllChatData();
  }

  @Get('/:id')
  async getChatDataByEmployeeId(@Param() id: number) {
    return this.chatService.getChatDataByEmployeeId(id);
  }

  @Delete('/:id')
  async deleteChatDataByEmployeeId(@Param() id: number) {
    return this.chatService.deleteChatDataByEmployeeId(id);
  }
}
