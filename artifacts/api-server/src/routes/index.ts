import { Router, type IRouter } from "express";
import healthRouter from "./health";
import proposalsRouter from "./proposals";
import ogImageRouter from "./og-image";
import favoritesRouter from "./favorites";
import toolSubmissionsRouter from "./tool-submissions";
import accountRouter from "./account";
import searchRouter from "./search";
import newsletterRouter from "./newsletter";
import contactRouter from "./contact";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(proposalsRouter);
router.use(ogImageRouter);
router.use(favoritesRouter);
router.use(toolSubmissionsRouter);
router.use(accountRouter);
router.use(searchRouter);
router.use(newsletterRouter);
router.use(contactRouter);
router.use(chatRouter);

export default router;
