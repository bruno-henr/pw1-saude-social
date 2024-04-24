import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(`${process.env.POSTGRES_URI}`);

export { sequelize };
