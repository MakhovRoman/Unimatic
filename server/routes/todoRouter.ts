import { Router } from "express";
import { todoController } from "../controllers/todoController";
const router = Router();

router.post('/', todoController.create);
router.put('/', todoController.update);
router.post('/all/', todoController.getAll);
router.delete('/:id', todoController.delete);

export default router;
