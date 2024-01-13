import supertest from 'supertest';
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
} from './testUtil.js';
import { web } from '../application/web.js';

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can create new address', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: 'street test',
        city: 'city test',
        province: 'province test',
        country: 'country test',
        postalCode: '1234',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('street test');
    expect(result.body.data.city).toBe('city test');
    expect(result.body.data.province).toBe('province test');
    expect(result.body.data.country).toBe('country test');
    expect(result.body.data.postalCode).toBe('1234');
  });

  it('should reject if request address is invalid', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: 'street test',
        city: 'city test',
        province: 'province test',
        country: '',
        postalCode: '',
      });
    console.log(result.body);
    expect(result.status).toBe(400);
  });
  it('should reject contact is not found', async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post('/api/contacts/' + (testContact.id + 1) + '/addresses')
      .set('Authorization', 'test')
      .send({
        street: 'street test',
        city: 'city test',
        province: 'province test',
        country: 'country test',
        postalCode: '1234',
      });
    console.log(result.body);
    expect(result.status).toBe(404);
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressesId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('street test');
    expect(result.body.data.city).toBe('city test');
    expect(result.body.data.province).toBe('province test');
    expect(result.body.data.country).toBe('country test');
    expect(result.body.data.postalCode).toBe('1234');
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(
        '/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1)
      )
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(404);
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(
        '/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id
      )
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(404);
  });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can update address', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: 'street test2',
        city: 'city test2',
        province: 'province test2',
        country: 'country test2',
        postalCode: '12342',
      });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('street test2');
    expect(result.body.data.city).toBe('city test2');
    expect(result.body.data.province).toBe('province test2');
    expect(result.body.data.country).toBe('country test2');
    expect(result.body.data.postalCode).toBe('12342');
  });

  it('should reject if request is invalid', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
      .set('Authorization', 'test')
      .send({
        street: 'street test2',
        city: 'city test2',
        province: 'province test2',
        country: '',
        postalCode: '',
      });

    console.log(result.body);

    expect(result.status).toBe(400);
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        '/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id
      )
      .set('Authorization', 'test')
      .send({
        street: 'street test2',
        city: 'city test2',
        province: 'province test2',
        country: 'sddad',
        postalCode: '22344',
      });

    console.log(result.body);

    expect(result.status).toBe(404);
  });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can delete address', async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        '/api/contacts/' + testContact.id + '/addresses/' + testAddress.id
      )
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it('should reject if contact is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        '/api/contacts/' + (testContact.id + 1) + '/addresses/' + testAddress.id
      )
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(404);
  });

  it('should reject if address is not found', async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        '/api/contacts/' + testContact.id + '/addresses/' + (testAddress.id + 1)
      )
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(404);
  });
});

describe('GET /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it('should can get list contacts ', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + testContact.id + '/addresses')
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });
  it('should reject if contact is not found ', async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get('/api/contacts/' + (testContact.id + 1) + '/addresses')
      .set('Authorization', 'test');

    console.log(result.body);

    expect(result.status).toBe(404);
  });
});
