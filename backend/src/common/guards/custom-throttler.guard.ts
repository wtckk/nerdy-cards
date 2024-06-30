import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext } from '@nestjs/common';

export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext,
  ): Promise<void> {
    throw new ThrottlerException(
      'Превышено количество запросов. Попробуйте позже',
    );
  }
}
