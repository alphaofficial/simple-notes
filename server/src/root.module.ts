import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { PersistenceModule } from './infra/persistence/persistence.module';

@Module({
  imports: [ApiModule, PersistenceModule],
})
export class RootModule {}
