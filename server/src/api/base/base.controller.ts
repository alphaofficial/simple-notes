import { HttpStatus } from '@nestjs/common';
import {
  ErrorResponse,
  SuccessResponse,
} from '@/api/base/base.controller.interface';
import { DomainError } from '@/core/abstract/domain.error';

export abstract class BaseController {
  protected handleSuccessResponse<T>(
    data?: T,
    httpStatus?: HttpStatus,
  ): SuccessResponse<T> {
    return {
      statusCode: httpStatus ?? HttpStatus.OK,
      message: 'operation successful',
      data,
    };
  }

  protected handleErrorResponse(
    error: unknown,
    meta?: Record<string, unknown>,
  ): ErrorResponse {
    const isDomainError = error instanceof DomainError;
    return {
      statusCode: isDomainError
        ? error.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'operation failed',
      error: isDomainError ? error.message : 'An unexpected error occurred',
      ...(meta ?? {}),
    };
  }
}
