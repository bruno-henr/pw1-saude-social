import { filesRepository } from "../../../repositories";
import { ListFileController } from "./ListFileController";
import { ListFileUseCase } from "./ListFileUseCase";

const listFileUseCase = new ListFileUseCase(filesRepository);
const listFileController = new ListFileController(listFileUseCase);

export { listFileController };
