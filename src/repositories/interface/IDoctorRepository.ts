import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { ResponseEntity } from "../../utils/implementations/ResponseEntity";

export interface IDoctorRepository {
    save(doctor: ICreateDoctorDTO): Promise<ResponseEntity>;
    edit(data: any): Promise<ResponseEntity>;
    list(queries: any): Promise<ResponseEntity>;
    delete(id: string): Promise<ResponseEntity>;
}
