import { Request, Response } from "express";
import { ResponseEntity } from "../../utils/implementations/ResponseEntity";
import { SearchUseCase } from "./SearchUseCase";

export class SearchController {
    constructor(private createDoctorUseCase: SearchUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const queries = request.query as any;

        try {
            const result = await this.createDoctorUseCase.execute(
                queries.query
            );
            return response.status(200).json(result);
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
