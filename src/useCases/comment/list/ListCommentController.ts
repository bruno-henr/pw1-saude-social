import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ListCommentUseCase } from "./ListPostUseCase";

export class ListCommentController {
    constructor(private listCommentUseCase: ListCommentUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { postagemId } = request.query;

            const result = await this.listCommentUseCase.execute(
                postagemId as string
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To GET Comment", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
