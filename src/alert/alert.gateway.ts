import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/alerts', cors: true })
export class AlertGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGatewayInit');

  afterInit() {
    this.logger.log('Initialized');
  }

  sendToAll(message: string) {
    this.wss.emit('alertToClient', { type: 'danger', message });
  }
}
