import { MikroORM } from '@mikro-orm/core';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { ApiModule } from '../../src/api/api.module';
import ormOptions from '../../src/infra/config/orm.config';
import { PersistenceModule } from '../../src/infra/persistence/persistence.module';
import { NoteEntity } from '@/core/notes/note.entity';
import { EventsModule } from '@/infra/eventEmitter/event.module';

describe('API Integration Test', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule, PersistenceModule, EventsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    orm = await MikroORM.init(ormOptions);
  });

  describe('Notes', () => {
    it('should fetch the list of notes from database', async () => {
      const response = await supertest(app.getHttpServer()).get(
        '/notes/getNotes',
      );
      const em = orm.em.fork();
      const count = await em.getRepository(NoteEntity).count();
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(count);
    });

    it(`should create a note and save to database`, async () => {
      const payload = {
        name: 'Test title',
        description: 'test description',
        meta: {
          color: 'red',
        },
      };
      const response = await supertest(app.getHttpServer())
        .post('/notes/createNote')
        .send(payload)
        .set('Accept', 'application/json');

      expect(response.body.statusCode).toBe(201);
      const em = orm.em.fork();
      const note = await em.getRepository(NoteEntity).findOne({
        id: response.body.data.id,
      });

      expect(note).toBeTruthy();
      expect(response.body.data.title).toStrictEqual(note.title);
      expect(response.body.data.content).toStrictEqual(note.content);
    });
  });

  afterAll(async () => {
    await app.close();
    await orm.close();
  });
});
