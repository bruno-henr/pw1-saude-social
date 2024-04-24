import { Request, Response } from "express";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";
import { DoctorDTO } from "../../../dto/DoctorDTO";
import { uuid } from "uuidv4";
import { ResponseEntity } from "../../../dto/ResponseEntity";
import { SequelizeScopeError, ValidationError } from "sequelize";

export class CreateDoctorController {
    constructor(private createDoctorUseCase: CreateDoctorUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const profileImage = request.file;
        const { apelido, crm, email, hospital, imagem, nome } =
            request.body as Omit<DoctorDTO, "id">;

        try {
            // creating  the new User
            const doctorDto = new DoctorDTO(
                uuid(),
                nome,
                apelido,
                crm,
                email,
                hospital,
                null,
            );

            // executing the useCase
            const doctorCreated = await this.createDoctorUseCase.execute(
                doctorDto,
                profileImage,
            );

            return response
                .status(200)
                .json(
                    new ResponseEntity(
                        true,
                        "Doctor Registered Sucessfully",
                        doctorCreated,
                    ),
                );
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
