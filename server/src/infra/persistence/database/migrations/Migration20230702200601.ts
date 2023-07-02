import { Migration } from '@mikro-orm/migrations';

// add ownerId and isFavorite columns to notes table
export class Migration20230702200601 extends Migration {
  async up(): Promise<void> {
    const knex = this.ctx ?? this.driver.getConnection('write').getKnex();
    const query = knex('notes')
      .update({
        ownerId: 'user_2S1oD5AR1cEf921mRAETqauPM77',
        isFavorite: false,
      })
      .toQuery();
    this.addSql(query);
  }

  override async down(): Promise<void> {
    const knex = this.ctx ?? this.driver.getConnection('write').getKnex();
    const query = knex('notes')
      .update({
        ownerId: null,
        isFavorite: null,
      })
      .toQuery();
    this.addSql(query);
  }
}
