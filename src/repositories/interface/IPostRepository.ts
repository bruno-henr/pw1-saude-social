import { ICreatePostDTO } from "../../useCases/post/create/DTO";
import { ResponseEntity } from "../../utils/implementations/ResponseEntity";

export interface IPostRepository {
    save(post: ICreatePostDTO): Promise<ResponseEntity>;
    edit(data: any): Promise<ResponseEntity>;
    list(queries: any): Promise<ResponseEntity>;
    delete(id: string): Promise<ResponseEntity>;
}
