import { DoctorDTO } from "../dto/DoctorDTO";

export interface DoctorRepository {
    findByPk(pk: string): Promise<DoctorDTO | null>;
    findByUsername(username: string): Promise<DoctorDTO | null>;
    setProfileImage(id: string, imageUrl: string): Promise<void>;
    save(doctor: DoctorDTO): Promise<void>;
    edit(id: string, data: any): Promise<boolean>;
    list(queries: any): Promise<DoctorDTO[]>;
    delete(id: string): Promise<boolean>;
}
