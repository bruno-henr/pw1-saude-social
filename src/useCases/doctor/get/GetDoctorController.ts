import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { GetDoctorUseCase } from "./GetDoctorUseCase";
import { IGetDoctorDTO } from "./DTO";

export class GetDoctorController {
    constructor(private getDoctorUseCase: GetDoctorUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id, crm } = request.query
            

            // executing the useCase
            const result = await this.getDoctorUseCase.execute({ id, crm } as IGetDoctorDTO);

            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To Get Doctor", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
