import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUSer = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(request.session.userId, request.currentUser);
    return request.currentUser;
  },
);
