import supertest from 'supertest';
import {
  createManyTestContact,
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContacts,
  removeTestUser,
} from './testUtil.js';
import { web } from '../application/web.js';

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create contact', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        phone: '12345678',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe('test');
    expect(result.body.data.lastName).toBe('test');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.phone).toBe('12345678');
  });

  it('should reject if request is not valid', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: '',
        lastName: 'test',
        email: 'test',
        phone: '12345673982727924739427388383883388383388',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe(testContact.firstName);
    expect(result.body.data.lastName).toBe(testContact.lastName);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it('should reject if 404 contact is not found ', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update existing contact', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        firstName: 'eko',
        lastName: 'khanedy',
        email: 'eko@pzn.com',
        phone: '9999',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe('eko');
    expect(result.body.data.lastName).toBe('khanedy');
    expect(result.body.data.email).toBe('eko@pzn.com');
    expect(result.body.data.phone).toBe('9999');
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id)
      .set('Authorization', 'test')
      .send({
        firstName: '',
        lastName: '',
        email: 'eko',
        phone: '',
      });

    expect(result.status).toBe(400);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .put('/api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test')
      .send({
        firstName: 'eko',
        lastName: 'khanedy',
        email: 'eko@pzn.com',
        phone: '9999',
      });

    expect(result.status).toBe(404);
  });
});

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can delete contact', async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete('/api/contacts/' + testContact.id)
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testContact = await getTestContact();

    expect(testContact).toBeNull();
  });

  it('should reject if  contact is not found', async () => {
    let testContact = await getTestContact();

    const result = await supertest(web)
      .delete('/api/contacts/' + (testContact.id + 1))
      .set('Authorization', 'test');

    expect(result.status).toBe(404);
  });
});

describe('GET api/contacts', () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can search contact without parameter', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it('should can search to page 2', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test')
      .query({
        page: 2,
      });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.totalPages).toBe(2);
    expect(result.body.paging.totalItems).toBe(15);
  });

  it('should can search using name', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test')
      .query({
        name: 'test1',
      });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });

  it('should can search using email', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test')
      .query({
        email: 'test1',
      });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });
  it('should can search using phone', async () => {
    const result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', 'test')
      .query({
        phone: '12341',
      });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPages).toBe(1);
    expect(result.body.paging.totalItems).toBe(6);
  });
});
