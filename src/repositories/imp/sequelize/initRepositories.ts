import { Sequelize } from "sequelize";
import { configureSequelize } from "../../../config/sequelizeConfig";
import { SequelizePostRepository } from "./SequeilzePostRepository";
import { SequelizeCommentsRepository } from "./SequelizeCommentsRepository";
import { SequelizeDoctorRepository } from "./SequelizeDoctorRepository";
import { SequelizeFilesRepository } from "./SequelizeFileRepository";

export function initRepositories(sequelize?: Sequelize) {
    const seq = sequelize || configureSequelize(`${process.env.POSTGRES_URI}`);

    // all models should be initialized in the correct order of dependencies
    const commentsRepository = new SequelizeCommentsRepository(seq);
    const filesRepository = new SequelizeFilesRepository(seq);
    const postRepository = new SequelizePostRepository(seq);
    const doctorRepository = new SequelizeDoctorRepository(seq);

    return { commentsRepository, postRepository, doctorRepository, filesRepository };
}
