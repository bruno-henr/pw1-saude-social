import { DataTypes, Model, ModelAttributes } from "sequelize";

class PostFileModel extends Model {}

const PostFileModelProperties: ModelAttributes = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    arquivoId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    postagemId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
};

export { PostFileModel, PostFileModelProperties };
