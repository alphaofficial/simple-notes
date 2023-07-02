import { HttpStatus } from '@nestjs/common';
import { DomainError } from '../abstract/domain.error';

export class ContentTooLarge extends DomainError {
  constructor() {
    super();
    this.message = 'Content is too long';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

export class InvalidNoteId extends DomainError {
  constructor() {
    super();
    this.message = 'Invalid note id';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

export class MissingUserId extends DomainError {
  constructor() {
    super();
    this.message = 'Missing user id';
    this.statusCode = HttpStatus.UNAUTHORIZED;
  }
}
