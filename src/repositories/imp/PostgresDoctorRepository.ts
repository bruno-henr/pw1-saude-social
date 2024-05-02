import { uuid } from "uuidv4";
import { Doctor } from "../../model/Doctor";
import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { IUpdateDoctorDTO } from "../../useCases/doctor/update/DTO";
import { ResponseEntity } from "../../utils/implementations/ResponseEntity";
import { IDoctorRepository } from "../interface/IDoctorRepository";

export class PostgresDoctorRepository implements IDoctorRepository {
    async save(doctor: ICreateDoctorDTO): Promise<ResponseEntity> {
        try {
            await Doctor.sync();
            const doctorSaved = await Doctor.create({ ...doctor, id: uuid() });
            return new ResponseEntity(true, "Docter registered", doctorSaved);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async updateOne(doctor: IUpdateDoctorDTO): Promise<ResponseEntity> {
        try {
            await Doctor.sync();
            const doctorUpdated = await Doctor.update(doctor, {
                where: { id: doctor.id },
            });
            return new ResponseEntity(true, "Doctor updated", doctorUpdated);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async list(queries: any): Promise<ResponseEntity> {
        try {
            await Doctor.sync();

            let doctors: Doctor[];
            if (Object.keys(queries).length)
                doctors = await Doctor.findAll({ where: queries });
            else doctors = await Doctor.findAll();

            return new ResponseEntity(true, "Doctors found", doctors);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async delete(id: string): Promise<ResponseEntity> {
        try {
            await Doctor.sync();
            const numDoctorDeleted = await Doctor.destroy({
                where: {
                    id,
                },
            });

            return new ResponseEntity(true, "Doctor deleted", numDoctorDeleted);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async findByPk(pk: string): Promise<ResponseEntity> {
        try {
            await Doctor.sync();
            const doctorFound = await Doctor.findByPk(pk);
            return new ResponseEntity(
                true,
                "Query successfull",
                doctorFound || {},
            );
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async findByUsername(username: string): Promise<ResponseEntity> {
        try {
            await Doctor.sync();
            const doctor = await Doctor.findOne({
                fieldMap: { apelido: username },
            });

            return new ResponseEntity(true, "Query successfull", doctor || {});
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async setProfileImage(
        username: string,
        imageUrl: string,
    ): Promise<ResponseEntity> {
        try {
            await Doctor.sync();
            const doctor = await Doctor.findOne({ where: { nome: username } });
            if (!doctor) throw new Error("Doctor Not Found");

            doctor.set({ imagem: imageUrl });
            const doctorUpdated = await doctor.save();

            return new ResponseEntity(true, "Image set", doctorUpdated);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
}
