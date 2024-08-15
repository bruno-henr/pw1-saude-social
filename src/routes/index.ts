import { Router } from "express";
import { doctorRouter } from "./doctor.routes";
import { postRouter } from "./post.routes";
import { commentRouter } from "./comment.routes";

export const router = Router();

router.use("/medico", doctorRouter);
router.use("/comment", commentRouter);
router.use(postRouter);
