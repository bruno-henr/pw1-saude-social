import { Router } from "express";
import { postRouter } from "./post.routes";
import { doctorRouter } from "./doctor";

export const router = Router();

router.use("/medico", doctorRouter);
router.use(postRouter);
