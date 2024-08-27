import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { CreateFilesUseCase } from "./CreateFileUseCase";
import { ICreateFileDTO } from "./DTO";

export class CreateFileController {
    constructor(private createFileUseCase: CreateFilesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const data: ICreateFileDTO = request.body;

            // executing the useCase
            const result = await this.createFileUseCase.execute(
                data
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(201).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To Register file", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
