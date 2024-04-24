import { DoctorDTO } from "../../dto/DoctorDTO";
import { Doctor } from "../../model/Doctor";
import { DoctorRepository } from "../DoctorRepository";

export class PostgresDoctorRepository implements DoctorRepository {
    async save(doctor: DoctorDTO): Promise<void> {
        await Doctor.sync();
        await Doctor.create({ ...doctor });
    }
    async edit(data: any): Promise<boolean> {
        await Doctor.sync();
        const response = await Doctor.update(data, {
            where: { id: data.id },
        });
        return response.length > 0;
    }

    async list(queries: any): Promise<Doctor[]> {
        await Doctor.sync();
        if (Object.keys(queries).length) {
            const doctors = await Doctor.findAll({ where: queries });
            return doctors;
        }
        const doctors = await Doctor.findAll();
        return doctors;
    }

    async delete(id: string): Promise<boolean> {
        await Doctor.sync();
        const doctorDeleted = await Doctor.destroy({
            where: {
                id,
            },
        });
        return doctorDeleted > 0;
    }

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
}
