import { Request, Response, Router } from "express";
import { body, header, validationResult } from "express-validator";
import multer from "multer";
import { deleteDoctorController } from "../useCases/doctor/delete";
import { updateDoctorController } from "../useCases/doctor/update";
import { getDoctorController } from "../useCases/doctor/get";
import { commentPostController } from "../useCases/comment/create";
import { listCommentController } from "../useCases/comment/list";

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
    upload.single("profileImage"),
    body(["id", "nome", "apelido", "crm", "email", "hospital"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"),
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return updateDoctorController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    },
);

commentRouter.delete(
    "/",
    header("doctorId")
        .notEmpty()
        .escape()
        .withMessage("Doctor Id must be passed in a HTTP header "),
    (req: Request, res: Response) => {
        if (validationResult(req).isEmpty())
            return deleteDoctorController.handle(req, res);
    },
);

export { commentRouter };
