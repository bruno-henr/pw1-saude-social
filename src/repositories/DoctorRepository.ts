import { DoctorDTO } from "../dto/DoctorDTO";
import { Doctor } from "../model/Doctor";

export interface DoctorRepository {
    findByPk(pk: string): Promise<Doctor | null>;
    findByUsername(username: string): Promise<Doctor | null>;
    setProfileImage(pk: string, imageUrl: string): Promise<void>;
    save(doctor: DoctorDTO): Promise<void>;
    edit(data: any): Promise<boolean>;
    list(queries: any): Promise<Doctor[]>;
    delete(id: string): Promise<boolean>;
}
