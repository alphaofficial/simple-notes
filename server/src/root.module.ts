import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { EventsModule } from './infra/eventEmitter/event.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

@Module({
	imports: [ApiModule, PersistenceModule, EventsModule],
})
export class RootModule {}
