import { IFilesRepository } from "../../../repositories/interface/IFilesRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class DeleteFileUseCase {
    constructor(
        private filesRepository: IFilesRepository,
    ) {}

    async execute(
        id: string
    ): Promise<ResponseEntity> {
        const result = await this.filesRepository.delete(id);
        if (!result.ok) return result;

        return result;
    }
}
