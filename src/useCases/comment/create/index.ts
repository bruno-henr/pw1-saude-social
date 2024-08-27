import { commentsRepository } from "../../../repositories";
import { CommentPostController } from "./CommentPostController";
import { CreateCommentUseCase } from "./CreatePostUseCase";

const createCommentUseCase = new CreateCommentUseCase(commentsRepository);
const commentPostController = new CommentPostController(createCommentUseCase);

export { commentPostController };
