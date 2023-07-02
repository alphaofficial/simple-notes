import { Migration } from '@mikro-orm/migrations';

export class Migration20230702200452 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table `notes` add column `ownerId` text null;');
    this.addSql(
      'alter table `notes` add column `isFavorite` integer null default false;',
    );
  }
}
