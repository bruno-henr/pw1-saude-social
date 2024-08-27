import { mediaProxy } from "../../../proxies";
import { postRepository } from "../../../repositories";
import { createFilesUseCase } from "../../files/create";
import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";

const createPostUseCase = new CreatePostUseCase(postRepository);
const createPostController = new CreatePostController(
    createPostUseCase, 
    mediaProxy,
    createFilesUseCase
);

export { createPostController };
