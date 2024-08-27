import { postRepository } from "../../../repositories";
import { ListPostController } from "./ListPostController";
import { ListPostUseCase } from "./ListPostUseCase";

const listPostUseCase = new ListPostUseCase(postRepository);
const listPostController = new ListPostController(listPostUseCase);

export { listPostController };
