import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { IUpdateDoctorDTO } from "../../useCases/doctor/update/DTO";
import { ResponseEntity } from "../../utils/implementations/ResponseEntity";

export interface IDoctorRepository {
    findByPk(pk: string): Promise<ResponseEntity>;
    findByUsername(username: string): Promise<ResponseEntity>;
    setProfileImage(
        username: string,
        imageUrl: string,
    ): Promise<ResponseEntity>;
    save(doctor: ICreateDoctorDTO): Promise<ResponseEntity>;
    updateOne(doctor: IUpdateDoctorDTO): Promise<ResponseEntity>;
    list(queries: any): Promise<ResponseEntity>;
    delete(id: string): Promise<ResponseEntity>;
}
