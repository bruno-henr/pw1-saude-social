import { IFilesRepository } from "../../../repositories/interface/IFilesRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IPutFileDTO } from "./DTO";

export class PutFileUseCase {
    constructor(
        private filesRepository: IFilesRepository,
    ) { }

    async execute(
        data: IPutFileDTO,
    ): Promise<ResponseEntity> {
        const result = await this.filesRepository.update(data);
        if (!result.ok) return result;

        return result;
    }
}
