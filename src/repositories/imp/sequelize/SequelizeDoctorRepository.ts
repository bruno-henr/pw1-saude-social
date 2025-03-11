import { Sequelize, WhereOptions } from "sequelize";
import { uuid } from "uuidv4";
import {
    DoctorModel,
    DoctorModelProperties,
} from "../../../model/imp/sequelize/DoctorModel";
import { PostModel } from "../../../model/imp/sequelize/PostModel";
import { ICreateDoctorDTO } from "../../../useCases/doctor/create/DTO";
import { IUpdateDoctorDTO } from "../../../useCases/doctor/update/DTO";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IDoctorRepository } from "../../interface/IDoctorRepository";

export class SequelizeDoctorRepository implements IDoctorRepository {
    constructor(sequelize: Sequelize) {
        DoctorModel.init(DoctorModelProperties, {
            sequelize,
            modelName: "Doctor",
            tableName: "medico",
        });

        DoctorModel.hasMany(PostModel, {
            foreignKey: "medicoId",
        });
        PostModel.belongsTo(DoctorModel, {
            foreignKey: "medicoId",
            as: "doctor",
        });
    }

    async save(doctor: ICreateDoctorDTO): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();
            const doctorSaved = await DoctorModel.create({
                ...doctor,
                id: uuid(),
            });
            return new ResponseEntity(true, "Docter registered", doctorSaved);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async updateOne(doctor: IUpdateDoctorDTO): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();
            const doctorUpdated = await DoctorModel.update(doctor, {
                where: { id: doctor.id },
            });
            return new ResponseEntity(true, "Doctor updated", doctorUpdated);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async list(queries: WhereOptions): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();

            let doctors: DoctorModel[];
            if (Object.keys(queries).length)
                doctors = await DoctorModel.findAll({ where: queries });
            else doctors = await DoctorModel.findAll();

            return new ResponseEntity(true, "Doctors found", doctors);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async findMedic({ nome }: { nome: string }): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();

            let doctors: DoctorModel[];
            doctors = await DoctorModel.findAll({ where: { nome } });

            return new ResponseEntity(true, "Doctors found", doctors);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async delete(id: string): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();
            const numDoctorDeleted = await DoctorModel.destroy({
                where: {
                    id,
                },
            });

            if (!numDoctorDeleted) throw new Error("Unable to delete doctor");

            return new ResponseEntity(true, "Doctor deleted", numDoctorDeleted);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async findByPk(pk: string): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();
            const doctorFound = await DoctorModel.findByPk(pk);

            if (!doctorFound) throw new Error("Doctor not found");

            return new ResponseEntity(true, "Query successfull", doctorFound);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async findByEmail(email: string): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();
            const doctorFound = await DoctorModel.findOne({
                where: { email }
            }
            );

            if (!doctorFound) throw new Error("Doctor not found");

            return new ResponseEntity(true, "Query successfull", doctorFound);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

    async findByUsername(username: string): Promise<ResponseEntity> {
        try {
            await DoctorModel.sync();
            const doctor = await DoctorModel.findOne({
                where: { apelido: username },
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
            await DoctorModel.sync();
            const doctor = await DoctorModel.findOne({
                where: { nome: username },
            });
            if (!doctor) throw new Error("Doctor Not Found");

            doctor.set({ imagem: imageUrl });
            const doctorUpdated = await doctor.save();

            return new ResponseEntity(true, "Image set", doctorUpdated);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
}
