import { FirebaseMediaProxy } from "../../../proxies/imp/FirebaseMediaProxy";
import { doctorRepository } from "../../../repositories";
import { CreateDoctorController } from "./CreateDoctorController";
import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

const mediaProxy = new FirebaseMediaProxy();
const createDoctorUseCase = new CreateDoctorUseCase(
    doctorRepository,
    mediaProxy,
);
const createDoctorController = new CreateDoctorController(createDoctorUseCase);

export { createDoctorController };
