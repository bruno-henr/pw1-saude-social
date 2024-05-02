/**
 * Handles all routes starting the /medico
 */

import { Router } from "express";
import { body, validationResult } from "express-validator";
import multer from "multer";
import { createDoctorController } from "../useCases/doctor/create";
import { updateDoctorController } from "../useCases/doctor/update";

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

export { doctorRouter };
