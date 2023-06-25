import { Migration } from '@mikro-orm/migrations';

export class Migration20230625103304 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `notes` (`id` integer not null primary key autoincrement, `createdAt` datetime null, `updatedAt` datetime null, `title` text not null, `blocks` json not null, `meta` json null);',
    );
  }
}
