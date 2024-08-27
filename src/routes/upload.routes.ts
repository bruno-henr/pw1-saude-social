import { Router, Express } from "express";
import { body, validationResult } from "express-validator";
import { createFileController } from "../useCases/files/create";
import { listFileController } from "../useCases/files/list";
import { putFileController } from "../useCases/files/put";
import { deleteFileController } from "../useCases/files/delete";

const uploadRouter = Router();

uploadRouter.post("/",
    body(["url", "postagemId"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"),
    (req, res) => {
        const result = validationResult(req.body);

        if (result.isEmpty()) {
            return createFileController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    }
);

uploadRouter.get("/",
    (req, res) => listFileController.handle(req, res)
);

uploadRouter.put("/",
    (req, res) => putFileController.handle(req, res)
);

uploadRouter.delete("/:id",
    (req, res) => deleteFileController.handle(req, res)
);

export { uploadRouter };