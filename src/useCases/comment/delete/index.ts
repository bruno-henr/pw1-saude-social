import { commentsRepository } from "../../../repositories";
import { DeleteCommentController } from "./DeleteCommentController";
import { DeleteCommentUseCase } from "./DeletePostUseCase";

const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository);
const deleteCommentController = new DeleteCommentController(deleteCommentUseCase);

export { deleteCommentController };
