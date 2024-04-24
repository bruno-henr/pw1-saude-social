import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";
import { File } from "./File";
import { Post } from './Post'

class PostFile extends Model { }

PostFile.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        arquivoId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        postagemId: {
            type: DataTypes.UUID,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "PostFile",
        tableName: "postagemArquivo",
    },
);


Post.belongsToMany(File, {
    through: PostFile,
    foreignKey: 'postagemId',
    otherKey: 'arquivoId',
    as: 'arquivos'
});
File.belongsToMany(Post, {
    through: PostFile,
    foreignKey: 'arquivoId',
    otherKey: 'postagemId',
    as: 'postagens'
});

export { PostFile }
