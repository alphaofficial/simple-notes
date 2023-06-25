import { EntitySchema } from '@mikro-orm/core';
import { BaseEntity } from '@/core/abstract/base.entity';

export const BaseSchema = new EntitySchema<BaseEntity>({
	name: 'BaseSchema',
	abstract: true,
	properties: {
		id: { type: 'number', primary: true },
		createdAt: {
			type: 'Date',
			onCreate: () => new Date(),
			nullable: true,
		},
		updatedAt: { type: 'Date', onUpdate: () => new Date(), nullable: true },
	},
});
