import { DoctorDTO } from "../../dto/DoctorDTO";
import { Doctor } from "../../model/Doctor";
import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { Response } from "../../utils/implementations/Response";
import { IDoctorRepository } from "../interface/IDoctorRepository";

export class PostgresDoctorRepository implements IDoctorRepository {
    async edit(data: any): Promise<Response> {
        try {
            await Doctor.sync();
            const response = await Doctor.update(
                data, { where: { id: data.id } }
            );

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
                    id
                }
            })

            return new Response(doctorDeleted, false, "");
        } catch (error: any) {
            return new Response({}, true, error.toString());
        }
    }
    async save(doctor: ICreateDoctorDTO): Promise<Response> {
        try {
            await Doctor.sync();
            const doctorSaved = await Doctor.create({ ...doctor });

            return new Response(doctorSaved, false, "");
        } catch (error: any) {
            return new Response({}, true, error.toString());
        }
    }
}
