import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import userController from '../controller/userController.js';
import contactController from '../controller/contactController.js';
import addressController from '../controller/addressController.js';
const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USER API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// CONTACT API
userRouter.post('/api/contacts', contactController.create);
userRouter.get('/api/contacts/:contactId', contactController.get);
userRouter.put('/api/contacts/:contactId', contactController.update);
userRouter.delete('/api/contacts/:contactId', contactController.remove);
userRouter.get('/api/contacts', contactController.search);

// ADDRESS API
userRouter.post('/api/contacts/:contactId/addresses', addressController.create);
userRouter.get(
  '/api/contacts/:contactId/addresses/:addressId',
  addressController.get
);
userRouter.put(
  '/api/contacts/:contactId/addresses/:addressId',
  addressController.update
);
userRouter.delete(
  '/api/contacts/:contactId/addresses/:addressId',
  addressController.remove
);
userRouter.get('/api/contacts/:contactId/addresses', addressController.list);

export { userRouter };
