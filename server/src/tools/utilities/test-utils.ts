import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { DatabaseAdapterInterface } from '@/api/interfaces/database.interface';
import { LoggerInterface } from '@/api/interfaces/logger.interface';
import { NoteController } from '@/api/notes/note.controller';
import { NoteService } from '@/api/notes/note.service';
import { NoteEntity } from '@/core/notes/note.entity';

export const NoteServiceMock = mock<NoteService>();
export const NoteRepositoryMock = mock<EntityRepository<NoteEntity>>();
export const DatabaseAdapterMock = mock<DatabaseAdapterInterface>();
export const LoggerMock = mock<LoggerInterface>();

export const getTestModule = async ({ providerOverrides = [] } = {}) =>
  Test.createTestingModule({
    controllers: [NoteController],
    providers: [
      {
        provide: 'NoteServiceInterface',
        useValue: NoteServiceMock,
      },
      {
        provide: getRepositoryToken(NoteEntity),
        useValue: NoteRepositoryMock,
      },
      {
        provide: 'DatabaseAdapterInterface',
        useValue: DatabaseAdapterMock,
      },
      {
        provide: 'LoggerInterface',
        useValue: LoggerMock,
      },
      ...providerOverrides,
    ],
  }).compile();
