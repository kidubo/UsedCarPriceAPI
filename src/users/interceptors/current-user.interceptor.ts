import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUSerInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
