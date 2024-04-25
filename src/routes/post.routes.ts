/**
 * Handles all routes starting the /medico
 */

import { Router } from "express";
import { createPostController } from "../useCases/post/create";
import { body, validationResult } from "express-validator";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const postRouter = Router();

postRouter.post(
    "/post",
    upload.array("filesPost", 5), 
    body(["conteudo", "tags", "vits", "medicoId"])
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

export { postRouter };
