import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '../../../../../app';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(`
      INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const {
      body: { refresh_token },
    } = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    });

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category integration',
        description: 'integration test create category',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with name already exists', async () => {
    const {
      body: { refresh_token },
    } = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    });

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category integration',
        description: 'integration test create category',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});
