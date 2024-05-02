import { initRepositories } from "../model/imp/sequelize";

const { commentsRepository, postRepository, doctorRepository } =
    initRepositories();

export { doctorRepository, postRepository };
