import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ListFileUseCase } from "./ListFileUseCase";

export class ListFileController {
    constructor(private listFileUseCase: ListFileUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { postagemId } = request.query;

            const result = await this.listFileUseCase.execute(
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
