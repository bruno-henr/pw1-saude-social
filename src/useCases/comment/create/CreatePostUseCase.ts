import { ICommentsRepository } from "../../../repositories/interface/ICommentsRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ICreateCommentDTO } from "./DTO";

export class CreateCommentUseCase {
    constructor(
        private commentRepository: ICommentsRepository
    ) { }

    async execute(
        data: ICreateCommentDTO,
    ): Promise<ResponseEntity> {
        const result = await this.commentRepository.save(data);
        if (!result.ok) return result;

        return result;
    }
}
