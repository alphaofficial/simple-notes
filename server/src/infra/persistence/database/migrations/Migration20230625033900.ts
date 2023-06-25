import { Migration } from '@mikro-orm/migrations';

export class Migration20230625033900 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "notes" rename column "content" to "blocks";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "notes" rename column "blocks" to "content";');
  }
}
