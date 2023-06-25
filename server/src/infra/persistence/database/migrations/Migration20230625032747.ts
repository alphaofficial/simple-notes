import { Migration } from '@mikro-orm/migrations';

export class Migration20230625032747 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "notes" ("id" serial primary key, "createdAt" timestamptz(0) null, "updatedAt" timestamptz(0) null, "title" varchar(255) not null, "content" jsonb not null, "meta" jsonb null);',
    );
  }
}
