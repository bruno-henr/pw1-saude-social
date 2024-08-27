import { Sequelize } from "sequelize";
import {
    FileModel, FileModelProperties
} from "../../../model/imp/sequelize/FileModel";
import { IFilesRepository } from "../../interface/IFilesRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { uuid } from "uuidv4";
import { ICreateFileDTO } from "../../../useCases/files/create/DTO";
import { IPutFileDTO } from "../../../useCases/files/put/DTO";

export class SequelizeFilesRepository implements IFilesRepository {
    constructor(private sequelize: Sequelize) {
        FileModel.init(FileModelProperties, {
            sequelize,
            modelName: "files",
            tableName: "arquivos",
        });
    }
    async save(data: ICreateFileDTO): Promise<ResponseEntity> {
        try {
            await FileModel.sync();
            const doctorSaved = await FileModel.create({
                ...data,
                id: uuid(),
            });
            return new ResponseEntity(true, "File registered", doctorSaved);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async update(data: IPutFileDTO): Promise<ResponseEntity> {
        try {
            await FileModel.sync();
            const fileUpdated = await FileModel.update(data, {
                where: { id: data.id },
            });
            return new ResponseEntity(true, "File updated", fileUpdated);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async list(postagemId: string): Promise<ResponseEntity> {
        try {
            await FileModel.sync();

            let files: FileModel[];
            if (!!postagemId)
                files = await FileModel.findAll({
                    where: {
                        postagemId
                    }
                });

            else files = await FileModel.findAll();

            return new ResponseEntity(true, "Files found", files);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }
    async delete(id: string): Promise<ResponseEntity> {
        try {
            await FileModel.sync();
            const fileDeleted = await FileModel.destroy({
                where: {
                    id,
                },
            });

            if (!fileDeleted) throw new Error("Unable to delete file");

            return new ResponseEntity(true, "File deleted", fileDeleted);
        } catch (error: any) {
            return new ResponseEntity(false, error, {});
        }
    }

}
