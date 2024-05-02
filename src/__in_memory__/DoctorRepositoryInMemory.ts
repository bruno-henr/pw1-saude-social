import { IDoctorDTO } from "../dto/IDoctorDto";
import { IDoctorRepository } from "../repositories/interface/IDoctorRepository";
import { IUpdateDoctorDTO } from "../useCases/doctor/update/DTO";
import { ResponseEntity } from "../utils/implementations/ResponseEntity";

class DoctorRepositoryInMemory implements IDoctorRepository {
    private doctors: IDoctorDTO[];

    constructor() {
        this.doctors = [];
    }

    async findByPk(pk: string): Promise<ResponseEntity> {
        const doc = this.doctors.find((dt) => dt.id == pk);
        return new ResponseEntity(true, "Dummy", doc || {});
    }

    async findByUsername(username: string): Promise<ResponseEntity> {
        const doc = this.doctors.find((dt) => dt.apelido == username);
        return new ResponseEntity(true, "Dummy", doc || []);
    }
    async setProfileImage(
        pk: string,
        imageUrl: string,
    ): Promise<ResponseEntity> {
        const doc = this.doctors.find((dt) => dt.id == pk);
        return new ResponseEntity(true, "Dummy", doc || {});
    }
    async save(doctor: IDoctorDTO): Promise<ResponseEntity> {
        if (
            this.doctors.find(
                (dt) =>
                    dt.id === doctor.id ||
                    dt.apelido == doctor.apelido ||
                    dt.crm === doctor.crm,
            )
        )
            return new ResponseEntity(false, "Doctor already registered", {});

        this.doctors.push(doctor);

        return new ResponseEntity(true, "Doctor registered", doctor);
    }
    async updateOne(uDoctor: IUpdateDoctorDTO): Promise<ResponseEntity> {
        const doctor = this.doctors.find((dt) => dt);
        if (!doctor) return new ResponseEntity(false, "Doctor not found", {});

        const doctorIndex = this.doctors.findIndex(
            (dt) => dt.id === uDoctor.id,
        );

        this.doctors[doctorIndex] = uDoctor;

        return new ResponseEntity(true, "Doctor updated", uDoctor);
    }
    async list(queries: any): Promise<ResponseEntity> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<ResponseEntity> {
        throw new Error("Method not implemented.");
    }
}

export { DoctorRepositoryInMemory };
