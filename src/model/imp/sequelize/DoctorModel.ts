import { DataTypes, Model, ModelAttributes } from "sequelize";

class DoctorModel extends Model {}

const DoctorModelProperties: ModelAttributes<DoctorModel> = {
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
};

export { DoctorModel, DoctorModelProperties };
