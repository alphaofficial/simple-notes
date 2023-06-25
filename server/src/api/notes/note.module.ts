import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
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
