import { filesRepository } from "../../../repositories";
import { CreateFileController } from "./CreateFileController";
import { CreateFilesUseCase } from "./CreateFileUseCase";

const createFilesUseCase = new CreateFilesUseCase(filesRepository);
const createFileController = new CreateFileController(createFilesUseCase);

export { createFileController, createFilesUseCase };
