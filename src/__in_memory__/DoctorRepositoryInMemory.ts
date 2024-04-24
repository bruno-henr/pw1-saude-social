import { DoctorDTO } from "../dto/DoctorDTO";
import { IDoctorRepository } from "../repositories/interface/IDoctorRepository";
import { ICreateDoctorDTO as IDoctor } from "../useCases/doctor/create/DTO";
import { Response } from "../utils/implementations/Response";

class DoctorRepositoryInMemory implements IDoctorRepository {
    private doctors: IDoctor[];

    constructor() {
        this.doctors = [];
    }

    async save(doctor: DoctorDTO): Promise<Response> {
        this.doctors.push(doctor);
        return new Response(doctor, false, "");
    }
    edit(data: any): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    list(queries: any): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Response> {
        throw new Error("Method not implemented.");
    }

}

export { DoctorRepositoryInMemory };
