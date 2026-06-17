import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const StoreId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const storeId = request.headers['x-store-id'] || request.user.stores?.[0]?.id;

    if (!storeId) {
      throw new BadRequestException(
        'storeId é obrigatório. Envie via header X-Store-Id',
      );
    }

    return storeId;
  },
);
