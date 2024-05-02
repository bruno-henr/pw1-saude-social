import { initRepositories } from "./imp/sequelize/initRepositories";

const { commentsRepository, postRepository, doctorRepository } =
    initRepositories();

export { doctorRepository, postRepository };
