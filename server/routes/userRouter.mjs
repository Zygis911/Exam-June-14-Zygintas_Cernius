import express from 'express';
import dotenv from 'dotenv';

import userController from '../controllers/userController.mjs';

import AuthMiddleware from '../middleware/authMiddleware.mjs';;

dotenv.config();

const router = express.Router();

router.post('/register', userController.createUser);

export default router;