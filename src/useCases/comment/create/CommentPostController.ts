import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { CreateCommentUseCase } from "./CreatePostUseCase";
import { ICreateCommentDTO } from "./DTO";

export class CommentPostController {
    constructor(private createCommentUseCase: CreateCommentUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const data: ICreateCommentDTO = request.body;

            // executing the useCase
            const result = await this.createCommentUseCase.execute(
                data
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(201).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To Register comment", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
