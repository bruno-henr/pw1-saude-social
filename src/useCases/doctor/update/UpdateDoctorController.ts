import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IUpdateDoctorDTO } from "./DTO";
import { UpdateDoctorService } from "./UpdateDoctorUseCase";

export class UpdateDoctorCotroller {
    constructor(private updateDoctorSerivce: UpdateDoctorService) {}

    async handle(req: Request, res: Response) {
        try {
            const doctor = req.body as IUpdateDoctorDTO;
            const result = await this.updateDoctorSerivce.execute(doctor);
            return res.status(result.ok ? 200 : 400).json(result);
        } catch (error: any) {
            return new ResponseEntity(false, "Unable to update doctor", {});
        }
    }
}
