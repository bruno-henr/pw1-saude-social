import { ICommentsRepository } from "../../../repositories/interface/ICommentsRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IPutCommentDTO } from "./DTO";

export class PutCommentUseCase {
    constructor(
        private commentsRepository: ICommentsRepository,
    ) { }

    async execute(
        data: IPutCommentDTO,
    ): Promise<ResponseEntity> {
        const result = await this.commentsRepository.update(data);
        if (!result.ok) return result;

        return result;
    }
}
