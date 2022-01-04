import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGatewayInit');

  afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: { sender: string; message: string }) {
    this.wss.to('chat').emit('chatToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, username: string) {
    client.join('chat');

    client.emit('joinedRoom');

    this.wss.to('chat').emit('chatToClient', {
      sender: '',
      message: `${username} joined to chat`,
    });
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, username: string) {
    client.leave('chat');

    client.emit('leftRoom');

    this.wss.to('chat').emit('chatToClient', {
      sender: '',
      message: `${username} left from chat`,
    });
  }
}
