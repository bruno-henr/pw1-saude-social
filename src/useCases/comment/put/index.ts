import { commentsRepository } from "../../../repositories";
import { PutCommentController } from "./PutPostController";
import { PutCommentUseCase } from "./PutPostUseCase";

const putCommentUseCase = new PutCommentUseCase(commentsRepository);
const putCommentController = new PutCommentController(putCommentUseCase);

export { putCommentController };
