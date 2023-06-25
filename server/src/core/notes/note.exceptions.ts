import { HttpStatus } from '@nestjs/common';
import { DomainError } from '../abstract/domain.error';

export class ContentTooLarge extends DomainError {
	constructor() {
		super();
		this.message = 'Content is too long';
		this.statusCode = HttpStatus.BAD_REQUEST;
	}
}
