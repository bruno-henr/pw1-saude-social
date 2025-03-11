import { doctorRepository } from "../../repositories";
import { postRepository } from "../../repositories";
import { IDoctorRepository } from "../../repositories/interface/IDoctorRepository";
import { SearchController } from "./SearchController";
import { SearchUseCase } from "./SearchUseCase";

const createDoctorUseCase = new SearchUseCase(
    doctorRepository as any,
    postRepository
);
const createDoctorController = new SearchController(createDoctorUseCase);

export { createDoctorController };
