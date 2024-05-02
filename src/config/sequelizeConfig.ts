import "dotenv/config";
import { Sequelize } from "sequelize";

export const configureSequelize = (uri: string) => {
    const sequelize = new Sequelize(uri);
    return sequelize;
};
