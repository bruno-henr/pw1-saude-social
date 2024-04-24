import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { Response } from "../../utils/implementations/Response";

export interface IDoctorRepository {
    save(doctor: ICreateDoctorDTO): Promise<Response>;
    edit(data: any): Promise<Response>;
    list(queries: any): Promise<Response>;
    delete(id: string): Promise<Response>;
}
