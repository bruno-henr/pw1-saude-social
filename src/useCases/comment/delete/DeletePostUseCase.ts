import { ICommentsRepository } from "../../../repositories/interface/ICommentsRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class DeleteCommentUseCase {
    constructor(
        private commentsRepository: ICommentsRepository,
    ) {}

    async execute(
        id: string
    ): Promise<ResponseEntity> {
        const result = await this.commentsRepository.delete(id);
        if (!result.ok) return result;

        return result;
    }
}
