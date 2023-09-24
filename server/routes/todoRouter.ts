import { Router } from "express";
import { todoController } from "../controllers/todoController";
const router = Router();

router.post('/', todoController.create);
router.put('/', todoController.modify);
router.post('/all/', todoController.getAll);
router.delete('/', todoController.delete);

export default router;
