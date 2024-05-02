import {
    PostgreSqlContainer,
    StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { configureSequelize } from "../../config/sequelizeConfig";
import { DoctorModel } from "../../model/imp/sequelize/DoctorModel";
import { SequelizeDoctorRepository } from "../../repositories/imp/sequelize/SequelizeDoctorRepository";
import { initRepositories } from "../../repositories/imp/sequelize/initRepositories";
import { ICreateDoctorDTO } from "../../useCases/doctor/create/DTO";
import { IUpdateDoctorDTO } from "../../useCases/doctor/update/DTO";

describe("Sequelize Doctor Repository", () => {
    jest.setTimeout(60000);

    let container: StartedPostgreSqlContainer;
    let repository: SequelizeDoctorRepository;

    beforeAll(async () => {
        container = await new PostgreSqlContainer().start();
        const sequelize = configureSequelize(container.getConnectionUri());
        const { doctorRepository } = initRepositories(sequelize);
        repository = doctorRepository;

        // creating table if not exists
        await DoctorModel.sync({ force: true });
    });

    beforeEach(async () => {
        await DoctorModel.truncate();
    });

    afterAll(async () => {
        await container.stop();
    });

    it("Should save a doctor successfully", async () => {
        const doctor: ICreateDoctorDTO = {
            apelido: "Jojo",
            crm: "3232",
            email: "jhon@email.com",
            hospital: "Albert Einstein",
            nome: "Jhon Joe",
            imagem: null,
        };

        const response = await repository.save(doctor);

        expect(response.ok).toBeTruthy();

        const createdDoctor = response.data;
        console.log(createdDoctor);
    });

    it("Should not save a doctor with already taken username", async () => {
        const doctor1: ICreateDoctorDTO = {
            apelido: "Jojo",
            crm: "3232",
            email: "jhon@email.com",
            hospital: "Albert Einstein",
            nome: "Jhon Joe",
            imagem: null,
        };

        await DoctorModel.create({ ...doctor1 });

        const doctor2: ICreateDoctorDTO = {
            apelido: "Jojo",
            crm: "3332",
            email: "jony@email.com",
            hospital: "Albert Einstein",
            nome: "Jonny Joe",
            imagem: null,
        };

        const response = await repository.save(doctor2);

        expect(response.ok).toBeFalsy();
    });

    it("Should update one doctor successfully", async () => {
        const oldDoctor: ICreateDoctorDTO = {
            apelido: "jason",
            crm: "3245",
            email: "json@email.com",
            hospital: "Albert Einstein",
            nome: "Jason Smith",
        };

        const createdDoctor = await DoctorModel.create({ ...oldDoctor });
        const doctorId = createdDoctor.getDataValue("id");

        const nomeExpected = "New Json";
        const newDoctor: IUpdateDoctorDTO = {
            ...oldDoctor,
            id: doctorId,
            nome: nomeExpected,
        };

        await repository.updateOne(newDoctor);

        DoctorModel.sync();
        const finalDoctor = await DoctorModel.findOne({
            where: { id: doctorId },
        });
        expect(finalDoctor).toBeTruthy();

        expect(finalDoctor!.getDataValue("nome")).toBe(nomeExpected);
    });

    it("Should find a doctor by its username", async () => {
        const doctor: ICreateDoctorDTO = {
            apelido: "Jojo",
            crm: "3232",
            email: "jhon@email.com",
            hospital: "Albert Einstein",
            nome: "Jhon Joe",
            imagem: null,
        };

        await repository.save(doctor);

        const response = await repository.findByUsername(doctor.apelido);

        const doctorFound = response.data as DoctorModel;

        expect(doctorFound.getDataValue("apelido")).toBe(doctor.apelido);
    });

    it("Should list all doctos saved", async () => {
        const doctor1: ICreateDoctorDTO = {
            apelido: "doctor1",
            crm: "3232",
            email: "doctor@email.com",
            hospital: "Albert Einstein",
            nome: "Doctor1",
            imagem: null,
        };

        const doctor2: ICreateDoctorDTO = {
            apelido: "doctor2",
            crm: "3432",
            email: "doctor2@email.com",
            hospital: "Albert Einstein",
            nome: "Doctor2",
            imagem: null,
        };

        await DoctorModel.bulkCreate([{ ...doctor1 }, { ...doctor2 }]);

        const response = await repository.list({});

        expect(response.ok).toBeTruthy();
        expect(response.data).toHaveLength(2);
    });

    it("Should delete one doctor successfully", async () => {
        const doctor: ICreateDoctorDTO = {
            apelido: "Jojo",
            crm: "3232",
            email: "jhon@email.com",
            hospital: "Albert Einstein",
            nome: "Jhon Joe",
            imagem: null,
        };

        const createduser = await DoctorModel.create({ ...doctor });

        const response = await repository.delete(
            createduser.getDataValue("id"),
        );
        expect(response.ok).toBeTruthy();

        const doctorList = await DoctorModel.findAll();

        expect(doctorList).toHaveLength(0);
    });
});
