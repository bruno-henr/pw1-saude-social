import { DoctorDTO } from "../../../dto/DoctorDTO";
import { DoctorRepository } from "../../../repositories/interface/IDoctorRepository";

export class CreateDoctorUseCase {
    constructor(private doctorRepository: DoctorRepository) {}

    async execute(doctor: DoctorDTO) {
        try {
            await this.doctorRepository.save(doctor);
        } catch (e) {
            throw new Error("Unable to create doctor: " + e);
        }
    }
}
