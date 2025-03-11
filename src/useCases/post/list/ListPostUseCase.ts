import { IPostRepository } from "../../../repositories/interface/IPostRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class ListPostUseCase {
    constructor(
        private postRepository: IPostRepository,
    ) { }

    async execute(
        data: { medicoId?: string, content?: string }
    ): Promise<ResponseEntity> {
        const result = await this.postRepository.list(data);
        if (!result.ok) return result;

        return result;
    }
}
