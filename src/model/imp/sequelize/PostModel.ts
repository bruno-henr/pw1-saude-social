import { DataTypes, Model, ModelAttributes } from "sequelize";

class PostModel extends Model {}

const PostModelProperties: ModelAttributes<PostModel> = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },

    conteudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    tags: {
        type: DataTypes.STRING,
    },

    vits: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
};

export { PostModel, PostModelProperties };
