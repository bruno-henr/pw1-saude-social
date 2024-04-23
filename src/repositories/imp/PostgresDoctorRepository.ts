import { DoctorDTO } from "../../dto/DoctorDTO";
import { Doctor } from "../../model/Doctor";
import { DoctorRepository } from "../interface/IDoctorRepository";

export class PostgresDoctorRepository implements DoctorRepository {
    async save(doctor: DoctorDTO): Promise<void> {
        await Doctor.sync();
        await Doctor.create({ ...doctor });
    }
}
