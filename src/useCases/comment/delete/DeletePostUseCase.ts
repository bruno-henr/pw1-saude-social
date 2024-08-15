import { IPostRepository } from "../../../repositories/interface/IPostRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class DeletePostUseCase {
    constructor(
        private postRepository: IPostRepository,
    ) {}

    async execute(
        id: string
    ): Promise<ResponseEntity> {
        const result = await this.postRepository.delete(id);
        if (!result.ok) return result;

        return result;
    }
}
