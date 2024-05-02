import { mediaProxy } from "../../../proxies";
import { doctorRepository } from "../../../repositories";
import { UpdateDoctorCotroller } from "./UpdateDoctorController";
import { UpdateDoctorUseCase } from "./UpdateDoctorUseCase";

const updateDoctorService = new UpdateDoctorUseCase(
    doctorRepository,
    mediaProxy,
);
const updateDoctorController = new UpdateDoctorCotroller(updateDoctorService);

export { updateDoctorController };
