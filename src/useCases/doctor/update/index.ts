import { PostgresDoctorRepository } from "../../../repositories/imp/PostgresDoctorRepository";
import { UpdateDoctorCotroller } from "./UpdateDoctorController";
import { UpdateDoctorService } from "./UpdateDoctorUseCase";

const updateDoctorService = new UpdateDoctorService(
    new PostgresDoctorRepository(),
);
const updateDoctorController = new UpdateDoctorCotroller(updateDoctorService);

export { updateDoctorController };
