import { prismaClient } from '../application/database';
import bcrypt from 'bcrypt';

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test',
    },
  });
};
const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test',
      password: await bcrypt.hash('rahasia', 10),
      name: 'test',
      token: 'test',
    },
  });
};

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test',
    },
  });
};

const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: 'test',
    },
  });
};

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@gmail,com',
      phone: '1234',
    },
  });
};
const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: 'test',
        firstName: `test${i}`,
        lastName: `test${i}`,
        email: `test${i}@gmail.com`,
        phone: `1234${i}`,
      },
    });
  }
};

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: 'test',
    },
  });
};

const removeAllTestAddresses = async () => {
  return await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: 'test',
      },
    },
  });
};

const createTestAddress = async () => {
  const testContact = await getTestContact();

  await prismaClient.address.create({
    data: {
      contactId: testContact.id,
      street: 'street test',
      city: 'city test',
      province: 'province test',
      country: 'country test',
      postalCode: '1234',
    },
  });
};

const getTestAddress = async () => {
  return await prismaClient.address.findFirst({
    where: {
      contact: {
        username: 'test',
      },
    },
  });
};

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContact,
  removeAllTestAddresses,
  createTestAddress,
  getTestAddress,
};
