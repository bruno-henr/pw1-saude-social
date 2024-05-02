import { mediaProxy } from "../../../proxies";
import { doctorRepository } from "../../../repositories";
import { UpdateDoctorCotroller } from "./UpdateDoctorController";
import { UpdateDoctorService } from "./UpdateDoctorUseCase";

const updateDoctorService = new UpdateDoctorService(
    doctorRepository,
    mediaProxy,
);
const updateDoctorController = new UpdateDoctorCotroller(updateDoctorService);

export { updateDoctorController };
