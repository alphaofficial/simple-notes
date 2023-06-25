import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CacheInterface } from '@/api/interfaces/cache.interface';
import { DatabaseAdapterInterface } from '@/api/interfaces/database.interface';
import { LoggerInterface } from '@/api/interfaces/logger.interface';
import { NoteService } from '@/api/notes/notes.service';
import { NoteEntity } from '@/core/notes/note.entity';
import { NoteController } from '@/api/controllers/notes/note.controller';

export const NoteServiceMock = mock<NoteService>();
export const NoteRepositoryMock = mock<EntityRepository<NoteEntity>>();
export const DatabaseAdapterMock = mock<DatabaseAdapterInterface>();
export const LoggerMock = mock<LoggerInterface>();
export const CacheAdapterMock = mock<CacheInterface>();

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
			{
				provide: 'CacheInterface',
				useValue: CacheAdapterMock,
			},
			...providerOverrides,
		],
	}).compile();
