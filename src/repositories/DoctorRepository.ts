import { Doctor } from "../model/Doctor";
import { ICreateDoctorDTO } from "../useCases/doctor/create/DTO";
import { Response } from "../utils/implementations/Response";

export interface DoctorRepository {
    findByPk(pk: string): Promise<Doctor | null>;
    findByUsername(username: string): Promise<Doctor | null>;
    setProfileImage(pk: string, imageUrl: string): Promise<void>;
    save(doctor: ICreateDoctorDTO): Promise<Response>;
    edit(data: any): Promise<Response>;
    list(queries: any): Promise<Response>;
    delete(id: string): Promise<Response>;
}
