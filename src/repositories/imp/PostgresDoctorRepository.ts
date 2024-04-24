import { DoctorDTO } from "../../dto/DoctorDTO";
import { Doctor } from "../../model/Doctor";
import { DoctorRepository } from "../DoctorRepository";

export class PostgresDoctorRepository implements DoctorRepository {
    async findByPk(pk: string): Promise<Doctor | null> {
        await Doctor.sync();
        const doctor = await Doctor.findByPk(pk);
        return doctor;
    }

    async findByUsername(username: string): Promise<Doctor | null> {
        await Doctor.sync();
        const doctor = await Doctor.findOne({
            fieldMap: { apelido: username },
        });
        return doctor;
    }

    async setProfileImage(pk: string, imageUrl: string): Promise<void> {
        await Doctor.sync();
        const doctor = await this.findByPk(pk);
        if (!doctor) throw new Error("Doctor Not Found");
        doctor.set({ imagem: imageUrl });
        await doctor.save();
    }

    async save(doctor: DoctorDTO): Promise<void> {
        await Doctor.sync();
        await Doctor.create({ ...doctor });
    }
}
