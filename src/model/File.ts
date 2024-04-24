import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";

class File extends Model { }

File.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "File",
        tableName: "arquivo",
    },
);

export { File };
