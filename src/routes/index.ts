import { Router } from "express";
import { doctorRouter } from "./doctor.routes";
import { postRouter } from "./post.routes";

export const router = Router();

router.use("/medico", doctorRouter);
router.use(postRouter);
