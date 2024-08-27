import { filesRepository } from "../../../repositories";
import { PutFileController } from "./PutFileController";
import { PutFileUseCase } from "./PutFileUseCase";

const putFileUseCase = new PutFileUseCase(filesRepository);
const putFileController = new PutFileController(putFileUseCase);

export { putFileController };
