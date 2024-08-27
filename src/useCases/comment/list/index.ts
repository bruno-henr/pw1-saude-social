import { commentsRepository } from "../../../repositories";
import { ListCommentController } from "./ListCommentController";
import { ListCommentUseCase } from "./ListPostUseCase";

const listCommentUseCase = new ListCommentUseCase(commentsRepository);
const listCommentController = new ListCommentController(listCommentUseCase);

export { listCommentController };
