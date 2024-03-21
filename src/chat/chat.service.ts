import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TABLE } from 'src/common/constants';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  getAllChatData() {
    console.log('object-chat-saved');
  }

  async saveChatData(chatData: CreateChatDto) {
    const payload = {
      ...chatData,
      sendDate: new Date().toISOString(),
    };
    try {
      await this.prisma.create(TABLE.CHAT, payload);
      return {
        status: HttpStatus.OK,
        message: 'chat Saved',
      };
    } catch (err) {
      console.log('POST::Chat', err);
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to Save chat',
      });
    }
  }

  getChatDataByEmployeeId(id: number) {
    console.log('object-chat-by-id', id);
  }

  deleteChatDataByEmployeeId(id: number) {
    console.log('object-delete-chat', id);
  }
}
