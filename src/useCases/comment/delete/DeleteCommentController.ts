import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { DeleteCommentUseCase } from "./DeletePostUseCase";

export class DeleteCommentController {
    constructor(private deletePostUseCase: DeleteCommentUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const result = await this.deletePostUseCase.execute(
                id as string
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To delete comment", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
