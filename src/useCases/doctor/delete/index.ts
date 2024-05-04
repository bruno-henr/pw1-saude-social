import { mediaProxy } from "../../../proxies";
import { doctorRepository } from "../../../repositories";
import { DeleteDoctorController } from "./DeleteDoctorController";
import { DeleteDoctorUseCase } from "./DeleteDoctorUseCase";

const deleteDoctorUseCase = new DeleteDoctorUseCase(
    doctorRepository,
    mediaProxy,
);
const deleteDoctorController = new DeleteDoctorController(deleteDoctorUseCase);

export { deleteDoctorController };
