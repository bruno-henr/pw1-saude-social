import { Sequelize } from "sequelize";
import {
    CommentsModel,
    CommentsModelProperties,
} from "../../../model/imp/sequelize/CommentsModel";
import { ICommentsRepository } from "../../interface/ICommentsRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { uuid } from "uuidv4";

export class SequelizeCommentsRepository implements ICommentsRepository {
    constructor(private sequelize: Sequelize) {
        CommentsModel.init(CommentsModelProperties, {
            sequelize,
            modelName: "Comments",
            tableName: "comentarios",
        });
    }
    async save(data: any): Promise<ResponseEntity> {
        try {
            await CommentsModel.sync();
            const commentSaved = await CommentsModel.create({
                ...data,
                id: uuid(),
            });
            return new ResponseEntity(true, "Comment registered", commentSaved);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async update(data: any): Promise<ResponseEntity> {
        try {
            await CommentsModel.sync();
            const commentUpdated = await CommentsModel.update(data, {
                where: { id: data.id },
            });
            return new ResponseEntity(true, "Comment updated", commentUpdated);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async list(postagemId?: string): Promise<ResponseEntity> {
        try {
            await CommentsModel.sync();
            let result: CommentsModel | CommentsModel[];
            if (!!postagemId)
                result = await CommentsModel.findAll({
                    where: {
                        postagemId: postagemId,
                    }
                });
            else result = await CommentsModel.findAll();

            return new ResponseEntity(true, "Comments found", result);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async delete(id: string): Promise<ResponseEntity> {
        try {
            await CommentsModel.sync();
            const numCommentDeleted = await CommentsModel.destroy({
                where: {
                    id,
                },
            });

            if (!numCommentDeleted) throw new Error("Unable to delete comment");

            return new ResponseEntity(true, "Comment deleted", numCommentDeleted);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
}
