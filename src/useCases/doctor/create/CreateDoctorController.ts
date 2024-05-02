import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";
import { ICreateDoctorDTO } from "./DTO";

export class CreateDoctorController {
    constructor(private createDoctorUseCase: CreateDoctorUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const profileImage = request.file;
        const { apelido, crm, email, hospital, imagem, nome } =
            request.body as ICreateDoctorDTO;

        try {
            // creating  the new User
            const doctorDto: ICreateDoctorDTO = {
                nome,
                apelido,
                crm,
                email,
                hospital,
            };

            // executing the useCase
            const result = await this.createDoctorUseCase.execute(
                doctorDto,
                profileImage,
            );
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To Register Doctor", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
