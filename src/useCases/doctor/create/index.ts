import { PostgresDoctorRepository } from "../../../repositories/imp/PostgresDoctorRepository";
import { CreateDoctorController } from "./CreateDoctorController";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

const doctorRepository = new PostgresDoctorRepository();
const createDoctorUseCase = new CreateDoctorUseCase(doctorRepository);
const createDoctorController = new CreateDoctorController(createDoctorUseCase);

export { createDoctorController };
