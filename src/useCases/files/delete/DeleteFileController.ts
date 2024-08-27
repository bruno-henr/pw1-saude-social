import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { DeleteFileUseCase } from "./DeleteFileUseCase";

export class DeleteFileController {
    constructor(private deleteFileUseCase: DeleteFileUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            console.log('mulesta de id ', id)
            const result = await this.deleteFileUseCase.execute(
                id as string
            );
            if (!result.ok) return response.status(400).json(result);
            return response.status(200).json(result);
        } catch (e) {
            const error = e as Error;

            return response.status(400).json(
                new ResponseEntity(false, "Unable To delete file", {
                    error: {
                        name: error.name,
                        message: error.message,
                    },
                }),
            );
        }
    }
}
