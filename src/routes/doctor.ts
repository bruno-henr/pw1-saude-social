/**
 * Handles all routes starting the /medico
 */

import { Router } from "express";
import { createDoctorController } from "../useCases/doctor/create";
import { body, validationResult } from "express-validator";
import multer from "multer";
import { ResponseEntity } from "../dto/ResponseDTO";

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

export { doctorRouter };
