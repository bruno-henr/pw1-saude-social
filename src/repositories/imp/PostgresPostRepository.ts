import { Post } from "../../model/Post";
import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { ICreatePostDTO } from "../../useCases/post/create/DTO";
import { ResponseEntity } from "../../utils/implementations/ResponseEntity";
import { IPostRepository } from "../interface/IPostRepository";
interface IDoctor {
    id: string;
    conteudo: string;
    tags: string;
    vits: string;
    medicoId: string;
}
export class PostgresPostRepository implements IPostRepository {
    async save(post: ICreatePostDTO): Promise<ResponseEntity> {
        try {
            await Post.sync();
            const postSaved = await Post.create({ ...post })
            
            
            return new ResponseEntity<Post>(true, "", postSaved);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
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