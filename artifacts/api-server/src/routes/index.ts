import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectRequestsRouter from "./project-requests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectRequestsRouter);

export default router;
