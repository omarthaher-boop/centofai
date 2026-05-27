import { Router, type IRouter } from "express";
import healthRouter from "./health";
import proposalsRouter from "./proposals";
import ogImageRouter from "./og-image";

const router: IRouter = Router();

router.use(healthRouter);
router.use(proposalsRouter);
router.use(ogImageRouter);

export default router;
