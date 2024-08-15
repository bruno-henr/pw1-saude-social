import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { PutPostUseCase } from "./PutPostUseCase";
import { IPutPostDTO } from "./DTO";

export class PutPostController {
    constructor(private putPostUseCase: PutPostUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filesPost = request.file;
            const data: IPutPostDTO = request.body;

            // executing the useCase
            const result = await this.putPostUseCase.execute(
                data,
                filesPost,
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To update Doctor", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
