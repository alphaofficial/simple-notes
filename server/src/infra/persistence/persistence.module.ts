import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import ormOptions from '../config/orm.config';

@Module({
	imports: [MikroOrmModule.forRoot(ormOptions)],
})
export class PersistenceModule {}
