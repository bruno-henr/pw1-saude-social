import { mediaProxy } from "../../../proxies";
import { postRepository } from "../../../repositories";
import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";

const createPostUseCase = new CreatePostUseCase(postRepository, mediaProxy);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostController };
