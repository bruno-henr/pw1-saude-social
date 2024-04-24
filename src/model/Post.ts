import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";
import { Comments } from './Comments'
import { File } from "./File";

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        conteudo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        tags: {
            type: DataTypes.STRING
        },

        vits: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: "Post",
        tableName: "postagem",
    },
);

Post.hasMany(Comments, {
    foreignKey: 'postagemId'
});

export { Post };
