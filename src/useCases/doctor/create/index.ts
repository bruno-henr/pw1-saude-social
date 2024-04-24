import { FirebaseMediaProxy } from "../../../proxies/imp/FirebaseMediaProxy";
import { PostgresDoctorRepository } from "../../../repositories/imp/PostgresDoctorRepository";
import { CreateDoctorController } from "./CreateDoctorController";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

const mediaProxy = new FirebaseMediaProxy();
const doctorRepository = new PostgresDoctorRepository();
const createDoctorUseCase = new CreateDoctorUseCase(
    doctorRepository,
    mediaProxy,
);
const createDoctorController = new CreateDoctorController(createDoctorUseCase);

export { createDoctorController };
