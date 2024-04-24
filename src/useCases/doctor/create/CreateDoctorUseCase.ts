import { DoctorDTO } from "../../../dto/DoctorDTO";
import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { Response } from "../../../utils/implementations/Response";
import { validateEmail } from "../../../utils/validations/validateEmail";
import { ICreateDoctorDTO } from "./DTO";

export class CreateDoctorUseCase {
    constructor(private doctorRepository: IDoctorRepository) { }

    async execute(doctor: ICreateDoctorDTO): Promise<Response> {
        if (!validateEmail(doctor.email)) {
            throw new Error("Email is invalid.");
        }
        return await this.doctorRepository.save(doctor);
    }
}
