import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NoteService } from './notes.service';
import { NoteController } from '../controllers/notes/note.controller';
import { NoteEntity } from '@/core/notes/note.entity';
import { logger } from '@/infra/logger/logger';
import { InMemoryCacheFactory } from '@/infra/persistence/cache/cacheProviders';

@Module({
	imports: [MikroOrmModule.forFeature([NoteEntity])],
	controllers: [NoteController],
	providers: [
		{
			provide: 'NoteServiceInterface',
			useClass: NoteService,
		},
		{
			provide: 'LoggerInterface',
			useValue: logger,
		},
		{
			provide: 'DatabaseAdapterInterface',
			useExisting: MikroORM,
		},
		{
			provide: 'CacheInterface',
			...InMemoryCacheFactory,
		},
	],
})
export class NoteModule {}
