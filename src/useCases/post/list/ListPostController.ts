import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ListPostUseCase } from "./ListPostUseCase";

export class ListPostController {
    constructor(private listPostUseCase: ListPostUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { medicoId } = request.query;

            const result = await this.listPostUseCase.execute(
                medicoId as string
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To GET Doctor", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
