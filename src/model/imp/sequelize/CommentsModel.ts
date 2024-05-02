import { DataTypes, Model, ModelAttributes } from "sequelize";

class CommentsModel extends Model {}

const CommentsModelProperties: ModelAttributes<CommentsModel> = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },

    conteudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};

export { CommentsModel, CommentsModelProperties };
