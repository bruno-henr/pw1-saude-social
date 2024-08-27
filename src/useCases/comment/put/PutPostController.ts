import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { PutCommentUseCase } from "./PutPostUseCase";
import { IPutCommentDTO } from "./DTO";

export class PutCommentController {
    constructor(private putCommentUseCase: PutCommentUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const data: IPutCommentDTO = request.body;

            // executing the useCase
            const result = await this.putCommentUseCase.execute(
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
