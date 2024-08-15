/**
 * Handles all routes starting the /medico
 */

import { Router } from "express";
import { createPostController } from "../useCases/post/create";
import { listPostController } from "../useCases/post/list";
import { body, validationResult } from "express-validator";
import multer from "multer";
import { putPostController } from "../useCases/post/put";
const upload = multer({ storage: multer.memoryStorage() });
const postRouter = Router();

postRouter.post(
    "/post",
    upload.array("filesPost", 5),
    body(["conteudo", "tags", "medicoId"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"), // validating fields
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return createPostController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    },
);

postRouter.get(
    "/post",
    (req, res) => {
        return listPostController.handle(req, res);
    },
);
postRouter.put(
    "/post",
    upload.array("filesPost", 5),
    body(["id"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"), // validating fields
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return putPostController.handle(req, res);
        }
        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    },
);

export { postRouter };
