import { IFilesRepository } from "../../../repositories/interface/IFilesRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ICreateFileDTO } from "./DTO";

export class CreateFilesUseCase {
    constructor(
        private filesRepository: IFilesRepository
    ) { }

    async execute(
        data: ICreateFileDTO,
    ): Promise<ResponseEntity> {
        const result = await this.filesRepository.save(data);
        if (!result.ok) return result;

        return result;
    }
}
