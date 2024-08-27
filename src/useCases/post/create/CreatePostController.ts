import { Request, Response } from "express";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { ICreatePostDTO } from "./DTO";
import { MediaProxy } from "../../../proxies/MediaProxy";
import { CreateFilesUseCase } from "../../files/create/CreateFileUseCase";

export class CreatePostController {
    constructor(
        private createPostUseCase: CreatePostUseCase,
        private mediaProxy: MediaProxy,
        private saveFileUseCase: CreateFilesUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const filesPost = request.files as Express.Multer.File[];
            console.log('filesPost => ', filesPost)
            const data: ICreatePostDTO = request.body;

            // executing the useCase
            const result = await this.createPostUseCase.execute(
                data,
                filesPost
            );
            if (!result.ok) return response.status(400).json(result);
            
            const { id: postagemId } = result.data as { id: string };

            if (filesPost) {
                for (const file of filesPost) {
                    const fileType = file.mimetype.split("/")[1];
                    const filePath = `${postagemId}/${Date.now()}.${fileType}`;
                    const url = await this.mediaProxy.saveImage(file.buffer, filePath);
                    await this.saveFileUseCase.execute({
                        postagemId,
                        url
                    })
                }
            }

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
