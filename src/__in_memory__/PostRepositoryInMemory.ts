import { IPostRepository } from "../repositories/interface/IPostRepository";
import { ICreatePostDTO } from "../useCases/post/create/DTO";
import { ResponseEntity } from "../utils/implementations/ResponseEntity";
import { uuid } from "uuidv4";

export class PostRepositoryInMemory implements IPostRepository {

    private posts: ICreatePostDTO[];

    constructor() {
        this.posts = [];
    }
    async save(post: ICreatePostDTO): Promise<ResponseEntity> {
        post.id = uuid();
        post.createdAt = new Date().toString();
        post.updatedAt = new Date().toString();
        this.posts.push(post);
        return new ResponseEntity<ICreatePostDTO>(true, "success", post);
    }
    edit(data: any): Promise<ResponseEntity> {
        throw new Error("Method not implemented.");
    }
    list(queries: any): Promise<ResponseEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<ResponseEntity> {
        throw new Error("Method not implemented.");
    }
}