import { mediaProxy } from "../../../proxies";
import { doctorRepository } from "../../../repositories";
import { GetDoctorController } from "./GetDoctorController";
import { GetDoctorUseCase } from "./GetDoctorUseCase";

const getDoctorUseCase = new GetDoctorUseCase(
    doctorRepository
);
const getDoctorController = new GetDoctorController(getDoctorUseCase);

export { getDoctorController };
