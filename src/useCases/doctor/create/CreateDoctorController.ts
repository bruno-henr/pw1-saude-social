import { Request, Response } from "express";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";
import { mediaProxy } from "../../../proxies";
import { DoctorDTO } from "../../../dto/DoctorDTO";
import { ICreateDoctorDTO } from "./DTO";

export class CreateDoctorController {
    constructor(private createDoctorUseCase: CreateDoctorUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const profileImage = request.file;
        let profileImageUrl = null;

        try {
            if (profileImage) {
                // saving the image to firebse and getting the url
                const fileType = profileImage.mimetype.split("/")[1];
                profileImageUrl = await mediaProxy.saveImage(
                    profileImage.buffer,
                    `dummyImage.${fileType}`,
                );
            }

            let doctorDto = {
                id: "d3b8bbbf-d91f-4c1e-a639-6f2715d60899",
                nome: "John Doe",
                apelido: "jony",
                crm: "1234567891012",
                email: "jhon@email.com",
                hospital: "hospial albert einstein",
                imagem: profileImageUrl
            }

            // executing the useCase
            const result = await this.createDoctorUseCase.execute(doctorDto);
            if (result.has_error) return response.status(400).json(result);
            return response.status(201).json(result);
        } catch (e: any) {
            return response.status(400).json({ error: e?.message });
        }
    }
}
