/**
 * Handles all routes starting the /medico
 */

import { Request, Response, Router } from "express";
import { body, header, validationResult } from "express-validator";
import multer from "multer";
import { createDoctorController } from "../useCases/doctor/create";
import { deleteDoctorController } from "../useCases/doctor/delete";
import { updateDoctorController } from "../useCases/doctor/update";
import { getDoctorController } from "../useCases/doctor/get";

const upload = multer({ storage: multer.memoryStorage() });
const doctorRouter = Router();

doctorRouter.post(
    "/register",
    upload.single("profileImage"), // getting the image
    body(["nome", "apelido", "crm", "email", "hospital"])
        .notEmpty()
        .escape()
        .withMessage("Field Cannot Be Empty"), // validating fields
    (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            return createDoctorController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: result.array(),
        });
    },
);

doctorRouter.get(
    "/",
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return getDoctorController.handle(req, res);
        }

        return res.status(400).json({
            ok: false,
            message: `All fields must be not fullfield`,
            erros: errors.array(),
        });
    },
);

doctorRouter.put(
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

doctorRouter.delete(
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

export { doctorRouter };
