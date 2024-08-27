import { MediaProxy } from "../../../proxies/MediaProxy";
import { IPostRepository } from "../../../repositories/interface/IPostRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ICreatePostDTO } from "./DTO";

export class CreatePostUseCase {
    constructor(
        private postRepository: IPostRepository,
    ) {}

    async execute(
        data: ICreatePostDTO,
        filesPost?: Express.Multer.File[],
    ): Promise<ResponseEntity> {
        const result = await this.postRepository.save(data);
        if (!result.ok) return result;

        // if everything was ok with the creation we save the profile image (if exists)
        console.log('filesPost controller => ', filesPost)
        

        return result;
    }
}
