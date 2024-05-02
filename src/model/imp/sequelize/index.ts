import { configureSequelize } from "../../../config/sequelizeConfig";
import { SequelizePostRepository } from "../../../repositories/imp/sequelize/SequeilzePostRepository";
import { SequelizeCommentsRepository } from "../../../repositories/imp/sequelize/SequelizeCommentsRepository";
import { SequelizeDoctorRepository } from "../../../repositories/imp/sequelize/SequelizeDoctorRepository";

export function initRepositories() {
    const sequelize = configureSequelize(`${process.env.POSTGRES_URI}`);

    // all models should be initialized in the correct order of dependencies
    const commentsRepository = new SequelizeCommentsRepository(sequelize);
    const postRepository = new SequelizePostRepository(sequelize);
    const doctorRepository = new SequelizeDoctorRepository(sequelize);

    return { commentsRepository, postRepository, doctorRepository };
}
