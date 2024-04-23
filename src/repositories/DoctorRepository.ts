import { DoctorDTO } from "../dto/DoctorDTO";

export interface DoctorRepository {
    save(doctor: DoctorDTO): Promise<void>;
}
