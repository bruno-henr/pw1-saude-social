import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import multer from "multer";
import { commentPostController } from "../useCases/comment/create";
import { listCommentController } from "../useCases/comment/list";
import { putCommentController } from "../useCases/comment/put";
import { deleteCommentController } from "../useCases/comment/delete";

const upload = multer({ storage: multer.memoryStorage() });
const commentRouter = Router();

commentRouter.post(
    "/register",
    body(["conteudo"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"), // validating fields
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return commentPostController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    },
);

commentRouter.get(
    "/",
    (req, res) => {
        return listCommentController.handle(req, res);
    }
);

commentRouter.put(
    "/",
    body(["id", "conteudo"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"),
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return putCommentController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    },
);

commentRouter.delete(
    "/:id",
    (req: Request, res: Response) => {
        return deleteCommentController.handle(req, res);
    },
);

export { commentRouter };
