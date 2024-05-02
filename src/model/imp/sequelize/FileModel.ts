import { DataTypes, Model, ModelAttributes } from "sequelize";

class FileModel extends Model {}

const FileModelProperties: ModelAttributes = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    url: {
        type: DataTypes.STRING,
    },
};

export { FileModel, FileModelProperties };
