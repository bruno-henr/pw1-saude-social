import { Sequelize } from "sequelize";
import {
    CommentsModel,
    CommentsModelProperties,
} from "../../../model/imp/sequelize/CommentsModel";

export class SequelizeCommentsRepository {
    constructor(private sequelize: Sequelize) {
        CommentsModel.init(CommentsModelProperties, {
            sequelize,
            modelName: "Comments",
            tableName: "comentarios",
        });
    }
}
