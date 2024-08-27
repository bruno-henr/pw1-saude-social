import { mediaProxy } from "../../../proxies";
import { postRepository } from "../../../repositories";
import { PutPostController } from "./PutPostController";
import { PutPostUseCase } from "./PutPostUseCase";

const putPostUseCase = new PutPostUseCase(postRepository, mediaProxy);
const putPostController = new PutPostController(putPostUseCase);

export { putPostController };
