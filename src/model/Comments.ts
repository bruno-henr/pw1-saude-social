import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";

class Comments extends Model { }

Comments.init(
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

    },
    {
        sequelize,
        modelName: "Comments",
        tableName: "comentarios",
    },
);

export { Comments };
