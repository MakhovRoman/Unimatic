import { Router } from "express";
import todoRouter from './todoRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

export default router;
