/**
 * Handles all routes starting the /medico
 */

import { Router } from "express";
import { createDoctorController } from "../useCases/doctor/create";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const doctorRouter = Router();

doctorRouter.post("/register", upload.single("profileImage"), (req, res) => {
    return createDoctorController.handle(req, res);
});

export { doctorRouter };
