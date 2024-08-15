import { postRepository } from "../../../repositories";
import { DeletePostController } from "./DeletePostController";
import { DeletePostUseCase } from "./DeletePostUseCase";

const deletePostUseCase = new DeletePostUseCase(postRepository);
const deletePostController = new DeletePostController(deletePostUseCase);

export { deletePostController };
