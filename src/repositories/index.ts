import { initRepositories } from "./imp/sequelize/initRepositories";

const { commentsRepository, postRepository, doctorRepository, filesRepository } =
    initRepositories();

export { doctorRepository, postRepository, commentsRepository, filesRepository };
