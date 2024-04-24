import { Doctor } from "../../model/Doctor";
import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { Response } from "../../utils/implementations/Response";
import { DoctorRepository } from "../DoctorRepository";

export class PostgresDoctorRepository implements DoctorRepository {
    async save(doctor: ICreateDoctorDTO): Promise<Response> {
        try {
            await Doctor.sync();
            const doctorSaved = await Doctor.create({ ...doctor });

            return new Response(doctorSaved, false, "");
        } catch (error: any) {
            return new Response({}, true, error.toString());
        }
    }
    async edit(data: any): Promise<Response> {
        try {
            await Doctor.sync();
            const response = await Doctor.update(data, {
                where: { id: data.id },
            });

            return new Response(response, false, "");
        } catch (error: any) {
            return new Response({}, true, error.toString());
        }
    }

    async list(queries: any): Promise<Response> {
        try {
            await Doctor.sync();
            if (Object.keys(queries).length) {
                const doctors = await Doctor.findAll({ where: queries });
                return new Response(doctors, false, "");
            }
            const doctors = await Doctor.findAll();
            return new Response(doctors, false, "");
        } catch (error: any) {
            return new Response({}, true, error.toString());
        }
    }

    async delete(id: string): Promise<Response> {
        try {
            await Doctor.sync();
            const doctorDeleted = await Doctor.destroy({
                where: {
                    id,
                },
            });

            return new Response(doctorDeleted, false, "");
        } catch (error: any) {
            return new Response({}, true, error.toString());
        }
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
