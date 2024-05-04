import { mediaProxy } from "../../../proxies";
import { doctorRepository } from "../../../repositories";
import { CreateDoctorController } from "./CreateDoctorController";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

const createDoctorUseCase = new CreateDoctorUseCase(
    doctorRepository,
    mediaProxy,
);
const createDoctorController = new CreateDoctorController(createDoctorUseCase);

export { createDoctorController };
