import express from 'express';
import { addProblem, getProblems, visitProblem, unvisitProblem, deleteProblem } from '../controllers/problem.controller.js';
import { addProblemMiddleware } from '../middleware/problem.middleware.js';
import { authorizationMiddleware } from '../middleware/authMiddleware.js';
import { requireProblemId } from '../middleware/problem.middleware.js';
import { verifyToken } from '../middleware/firebaseMiddleware.js';

const router = express.Router();


router.post('/addProblem', verifyToken, authorizationMiddleware, addProblemMiddleware, addProblem);

router.post('/visitProblem', verifyToken, authorizationMiddleware, requireProblemId, visitProblem);

router.post('/unvisitProblem', verifyToken, authorizationMiddleware, requireProblemId, unvisitProblem);

router.post('/deleteProblem', verifyToken, authorizationMiddleware, requireProblemId, deleteProblem);

router.get('/getProblems', verifyToken, authorizationMiddleware, getProblems);

export default router;