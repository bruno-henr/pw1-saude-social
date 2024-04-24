import { DoctorDTO } from "../../dto/DoctorDTO";
import { Doctor } from "../../model/Doctor";
import { DoctorRepository } from "../DoctorRepository";

export class PostgresDoctorRepository implements DoctorRepository {
    async save(doctor: DoctorDTO): Promise<void> {
        await Doctor.sync();
        await Doctor.create({ ...doctor });
    }
    async edit(id: string, data: any): Promise<boolean> {
        await Doctor.sync();
        const response = await Doctor.update(data, {
            where: { id: data.id },
        });
        return response.length > 0;
    }

    async list(queries: any): Promise<DoctorDTO[]> {
        await Doctor.sync();

        let doctors: Doctor[];
        if (Object.keys(queries).length)
            doctors = await Doctor.findAll({ where: queries });
        else doctors = await Doctor.findAll();

        const doctorsList = doctors.map(
            (dt) =>
                new DoctorDTO(
                    dt.getDataValue("id"),
                    dt.getDataValue("nome"),
                    dt.getDataValue("apelido"),
                    dt.getDataValue("crm"),
                    dt.getDataValue("email"),
                    dt.getDataValue("hospital"),
                    dt.getDataValue("imagem"),
                ),
        );

        return doctorsList;
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

    async findByPk(pk: string): Promise<DoctorDTO | null> {
        await Doctor.sync();
        const doctor = await Doctor.findByPk(pk);

        return doctor
            ? new DoctorDTO(
                  doctor.getDataValue("id"),
                  doctor.getDataValue("nome"),
                  doctor.getDataValue("apelido"),
                  doctor.getDataValue("crm"),
                  doctor.getDataValue("email"),
                  doctor.getDataValue("hospital"),
                  doctor.getDataValue("imagem"),
              )
            : null;
    }

    async findByUsername(username: string): Promise<DoctorDTO | null> {
        await Doctor.sync();
        const doctor = await Doctor.findOne({
            fieldMap: { apelido: username },
        });

        return doctor
            ? new DoctorDTO(
                  doctor.getDataValue("id"),
                  doctor.getDataValue("nome"),
                  doctor.getDataValue("apelido"),
                  doctor.getDataValue("crm"),
                  doctor.getDataValue("email"),
                  doctor.getDataValue("hospital"),
                  doctor.getDataValue("imagem"),
              )
            : null;
    }

    async setProfileImage(pk: string, imageUrl: string): Promise<void> {
        await Doctor.sync();
        const doctor = await Doctor.findByPk(pk);
        if (!doctor) throw new Error("Doctor Not Found");
        doctor.set({ imagem: imageUrl });
        await doctor.save();
    }
}
