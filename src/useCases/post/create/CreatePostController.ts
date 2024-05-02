import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { ICreatePostDTO } from "./DTO";

export class CreatePostController {
    constructor(private createPostUseCase: CreatePostUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filesPost = request.file;
            const data: ICreatePostDTO = request.body;

            // executing the useCase
            const result = await this.createPostUseCase.execute(
                data,
                filesPost,
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(201).json(result);
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
