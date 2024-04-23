import { Request, Response } from "express";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";
import { mediaProxy } from "../../../proxies";
import { DoctorDTO } from "../../../dto/DoctorDTO";

export class CreateDoctorController {
    constructor(private createDoctorUseCase: CreateDoctorUseCase) {}

    async handle(request: Request, response: Response) {
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

            // creating  the new User
            const doctorDto = new DoctorDTO(
                "d3b8bbbf-d91f-4c1e-a639-6f2715d60899",
                "John Doe",
                "jony",
                "1234567891012",
                "jhon@email.com",
                "hospial albert einstein",
                profileImageUrl,
            );

            // executing the useCase
            await this.createDoctorUseCase.execute(doctorDto);

            return response.status(200).json("Created");
        } catch (e) {
            return response.status(400).json("Something went wrong: ");
        }
    }
}
