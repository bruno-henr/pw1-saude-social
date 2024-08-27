import { Sequelize } from "sequelize";
import { CommentsModel } from "../../../model/imp/sequelize/CommentsModel";
import {
    PostModel,
    PostModelProperties,
} from "../../../model/imp/sequelize/PostModel";
import { ICreatePostDTO } from "../../../useCases/post/create/DTO";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IPostRepository } from "../../interface/IPostRepository";
import { IPutPostDTO } from "../../../useCases/post/put/DTO";
import { FileModel } from "../../../model/imp/sequelize/FileModel";

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
        PostModel.hasMany(FileModel, {
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
    async edit(post: IPutPostDTO): Promise<ResponseEntity> {
        try {
            await PostModel.sync();
            const result = await PostModel.update(post, {
                where: { id: post.id },
            });

            return new ResponseEntity(true, "Post updated", result);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async list(medicoId: string): Promise<ResponseEntity> {
        try {
            await PostModel.sync();
            let result: PostModel | PostModel[];
            console.log('medicId ', medicoId)
            if (!!medicoId)
                result = await PostModel.findAll({
                    where: {
                        medicoId: medicoId,
                    },
                    include: [CommentsModel, FileModel]
                });
            else result = await PostModel.findAll({
                include: [CommentsModel, FileModel]
            });

            return new ResponseEntity(true, "Post found", result);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async delete(id: string): Promise<ResponseEntity> {
        try {
            await PostModel.sync();
            const numPostDeleted = await PostModel.destroy({
                where: {
                    id,
                },
            });

            if (!numPostDeleted) throw new Error("Unable to delete post");

            return new ResponseEntity(true, "Post deleted", numPostDeleted);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
}
