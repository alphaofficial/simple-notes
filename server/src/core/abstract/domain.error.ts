import { HttpStatus } from '@nestjs/common';

export abstract class DomainError extends Error {
	public message: string;
	public statusCode: HttpStatus;
}
