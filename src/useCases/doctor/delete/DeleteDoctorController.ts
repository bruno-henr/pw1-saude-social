import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { DeleteDoctorUseCase } from "./DeleteDoctorUseCase";

export class DeleteDoctorController {
    constructor(private deleteDoctorUseCase: DeleteDoctorUseCase) {}

    async handle(req: Request, res: Response) {
        try {
            const doctorId = req.headers["doctorid"] as string;
            console.log(">>>>>>>>>>>>>>>.", req.headers);

            // trying to delete the doctor
            const response = await this.deleteDoctorUseCase.execute(doctorId);
            return res.status(response.ok ? 200 : 400).json(response);
        } catch (e: any) {
            return res
                .status(400)
                .json(new ResponseEntity(false, e.message, {}));
        }
    }
}
