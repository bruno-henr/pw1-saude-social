import { ICommentsRepository } from "../../../repositories/interface/ICommentsRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class ListCommentUseCase {
    constructor(
        private commentsRepository: ICommentsRepository,
    ) {}

    async execute(
        postagemId: string
    ): Promise<ResponseEntity> {
        const result = await this.commentsRepository.list(postagemId);
        if (!result.ok) return result;

        return result;
    }
}
