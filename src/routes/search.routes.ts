import { Router } from "express";
import { createDoctorController } from "../useCases/search";


export const searchRouter = Router();

searchRouter.get('/search', (req, response) => {
    return createDoctorController.handle(req, response);
})