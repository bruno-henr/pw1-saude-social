import { Sequelize } from "sequelize";
import { CommentsModel } from "../../../model/imp/sequelize/CommentsModel";
import {
    PostModel,
    PostModelProperties,
} from "../../../model/imp/sequelize/PostModel";
import { ICreatePostDTO } from "../../../useCases/post/create/DTO";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IPostRepository } from "../../interface/IPostRepository";

export class SequelizePostRepository implements IPostRepository {
    constructor(sequelize: Sequelize) {
        PostModel.init(PostModelProperties, {
            sequelize,
            modelName: "Post",
            tableName: "postagem",
        });

        PostModel.hasMany(CommentsModel, {
            foreignKey: "postagemId",
        });
    }

    async save(post: ICreatePostDTO): Promise<ResponseEntity> {
        try {
            await PostModel.sync();
            const postSaved = await PostModel.create({ ...post });

            return new ResponseEntity<PostModel>(true, "", postSaved);
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
