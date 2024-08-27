import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { PutFileUseCase } from "./PutFileUseCase";
import { IPutFileDTO } from "./DTO";

export class PutFileController {
    constructor(private putFileUseCase: PutFileUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const data: IPutFileDTO = request.body;

            // executing the useCase
            const result = await this.putFileUseCase.execute(
                data
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To update comment", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
