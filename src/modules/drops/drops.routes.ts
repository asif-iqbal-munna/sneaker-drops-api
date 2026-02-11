import { Router } from "express";
import { getDrops, handleCreateDrop } from "./drops.controller";
import { validateReqBody } from "../../middleware/validateReqBody";
import { dropCreationSchema } from "./drops.schema";

const router = Router();

router.get('/', getDrops);
router.post('/', validateReqBody(dropCreationSchema), handleCreateDrop);

export default router;