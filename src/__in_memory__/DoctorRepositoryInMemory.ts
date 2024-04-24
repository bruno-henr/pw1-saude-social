import { DoctorDTO } from "../dto/DoctorDTO";
import { DoctorRepository } from "../repositories/DoctorRepository";

class DoctorRepositoryInMemory implements DoctorRepository {
    private doctors: DoctorDTO[];

    constructor() {
        this.doctors = [];
    }

    async findByPk(pk: string): Promise<DoctorDTO | null> {
        const doc = this.doctors.find((dt) => dt.id == pk);
        return doc ? doc : null;
    }

    async findByUsername(username: string): Promise<DoctorDTO | null> {
        const doc = this.doctors.find((dt) => dt.apelido == username);
        return doc ? doc : null;
    }
    async setProfileImage(pk: string, imageUrl: string): Promise<void> {
        const doc = this.doctors.find((dt) => dt.id == pk);
        if (!doc) throw new Error("Doctor not found");
    }
    async save(doctor: DoctorDTO): Promise<void> {
        if (
            this.doctors.find(
                (dt) =>
                    dt.id === doctor.id ||
                    dt.apelido == doctor.apelido ||
                    dt.crm === doctor.crm,
            )
        )
            throw new Error("Doctor already registered");

        this.doctors.push(doctor);
    }
    async edit(data: any): Promise<boolean> {
        const doctor = this.doctors.find((dt) => dt);
        if (!doctor) throw new Error("Doctor not found");

        return true;
    }
    async list(queries: any): Promise<DoctorDTO[]> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export { DoctorRepositoryInMemory };
