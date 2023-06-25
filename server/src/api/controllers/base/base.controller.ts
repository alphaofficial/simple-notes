import { HttpStatus } from '@nestjs/common';
import retry from 'retry';
import { DomainError } from '@/core/abstract/domain.error';
import defaultRetryPolicy from '@/infra/config/retry.config';
import {
	ErrorResponse,
	RetryConfig,
	SuccessResponse,
} from '@/api/controllers/base/base.controller.interface';
import { logger } from '@/infra/logger/logger';

export abstract class BaseController {
	private readonly defaultRetryableExceptions = ['ConnectionException'];

	protected handleSuccessResponse<T>(
		data: T,
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

	protected async executeWithRetries<T>(
		fn: () => Promise<T>,
		retryConfig: Partial<RetryConfig> = {},
	): Promise<T> {
		const {
			scope = 'executeWithRetries',
			params = {},
			retryableExceptions = [],
			...retryPolicy
		} = retryConfig;

		const operation = retry.operation({
			...defaultRetryPolicy,
			...retryPolicy,
		});

		return new Promise((resolve, reject) => {
			operation.attempt((currentAttempt: number) => {
				fn()
					.then(resolve)
					.catch((error) => {
						const hasRetryableExceptions = [
							...this.defaultRetryableExceptions,
							...retryableExceptions,
						].includes(error.constructor.name);

						if (hasRetryableExceptions && operation.retry(error as Error)) {
							logger.info(scope, 'Retrying, operation', {
								currentAttempt,
								params,
							});
							return;
						}
						reject(operation.mainError() || error);
					});
			});
		});
	}
}
