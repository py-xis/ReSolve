import express from 'express';
import { authorizationMiddleware } from '../middleware/authMiddleware.js';
import { getUserDetails, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/firebaseMiddleware.js';
const router = express.Router();

//  Route to Get User Details by ID
router.get('/', verifyToken, authorizationMiddleware, getUserDetails);

// router.patch('/', authorizationMiddleware, updateUser);

export default router;