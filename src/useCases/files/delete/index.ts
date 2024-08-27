import { filesRepository } from "../../../repositories";
import { DeleteFileController } from "./DeleteFileController";
import { DeleteFileUseCase } from "./DeleteFileUseCase";

const deleteFileUseCase = new DeleteFileUseCase(filesRepository);
const deleteFileController = new DeleteFileController(deleteFileUseCase);

export { deleteFileController };
