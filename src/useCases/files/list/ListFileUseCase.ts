import { IFilesRepository } from "../../../repositories/interface/IFilesRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class ListFileUseCase {
    constructor(
        private filesRepository: IFilesRepository,
    ) {}

    async execute(
        postagemId: string
    ): Promise<ResponseEntity> {
        const result = await this.filesRepository.list(postagemId);
        if (!result.ok) return result;

        return result;
    }
}
