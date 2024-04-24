import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelizeConfig";
import { Comments } from './Comments'

class Doctor extends Model { }

Doctor.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        nome: {
            type: DataTypes.STRING,
        },

        apelido: {
            type: DataTypes.STRING,
            unique: true,
        },

        crm: {
            type: DataTypes.CHAR(13),
            unique: true,
        },

        email: {
            type: DataTypes.STRING,
            unique: true,
        },

        hospital: {
            type: DataTypes.STRING,
        },

        imagem: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Doctor",
        tableName: "medico",
    },
);

export { Doctor };
