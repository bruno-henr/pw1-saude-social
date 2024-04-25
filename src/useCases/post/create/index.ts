import { FirebaseMediaProxy } from "../../../proxies/imp/FirebaseMediaProxy";
import { PostgresPostRepository } from "../../../repositories/imp/PostgresPostRepository";
import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";

const mediaProxy = new FirebaseMediaProxy();
const postgresPostRepository = new PostgresPostRepository();

const createPostUseCase = new CreatePostUseCase(
    postgresPostRepository,
    mediaProxy,
);
const createPostController = new CreatePostController(
    createPostUseCase
);

export { createPostController };
