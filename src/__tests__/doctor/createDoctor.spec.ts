import { describe, expect, test } from "@jest/globals";
import { uuid } from "uuidv4";
import { DoctorRepositoryInMemory } from "../../__in_memory__/DoctorRepositoryInMemory";
import { MediaProxyInMemory } from "../../__in_memory__/MediaProxyInMemory";
import { CreateDoctorUseCase } from "../../useCases/doctor/create/CreateDoctorUseCase";

describe("Create Doctor", () => {
    let mediaProxyInMemory: MediaProxyInMemory | null;
    let doctorRepositoryInMemory: DoctorRepositoryInMemory | null;

    let createDoctorUseCase: CreateDoctorUseCase | null;

    beforeEach(() => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        mediaProxyInMemory = new MediaProxyInMemory();
        createDoctorUseCase = new CreateDoctorUseCase(
            doctorRepositoryInMemory,
            mediaProxyInMemory,
        );
    });

    afterEach(() => {
        createDoctorUseCase = null;
        mediaProxyInMemory = null;
        doctorRepositoryInMemory = null;
    });

    test("should be able create an doctor", async () => {
        const expectedId = "d3b8bbbf-d91f-4c1e-a639-6f2715d60899";
        let doctorDto = {
            id: expectedId,
            nome: "John Doe",
            apelido: "jony",
            crm: "1234567891012",
            email: "jhon@email.com",
            hospital: "hospial albert einstein",
            imagem: null,
        };

        const doctorCreated = createDoctorUseCase?.execute(doctorDto);

        expect(doctorDto.id).toBe(expectedId);
    });

    test("Should return the doctor created", async () => {
        let doctorDto = {
            id: uuid(),
            nome: "John Doe",
            apelido: "jony",
            crm: "1234567891012",
            email: "jhon@email.com",
            hospital: "hospial albert einstein",
            imagem: null,
        };

        const doctorCreated = await createDoctorUseCase?.execute(doctorDto);

        expect(JSON.stringify(doctorCreated!.data)).toBe(
            JSON.stringify(doctorDto),
        );
    });

    test("should not be able to create an doctor with a taken username", async () => {
        let doc1 = {
            id: "d3b8bbbf-d91f-4c1e-a639-6f2715d60899",
            nome: "John Doe",
            apelido: "jony",
            crm: "1234567891012",
            email: "jhon@email.com",
            hospital: "hospial albert einstein",
            imagem: null,
        };

        let doc2 = { ...doc1 };

        await createDoctorUseCase!.execute(doc1);
        const response = await createDoctorUseCase!.execute(doc2);
        expect(response.ok).toBeFalsy();
    });

    test("should not be able to create an doctor with a registered CRM", async () => {
        let doc1 = {
            id: uuid(),
            nome: "John Doe",
            apelido: "jonyy",
            crm: "1234567891012",
            email: "jhon@email.com",
            hospital: "hospial albert einstein",
            imagem: null,
        };

        let doc2 = (doc1 = {
            id: uuid(),
            nome: "John Doe",
            apelido: "jn",
            crm: "1234567891012",
            email: "jhonde@email.com",
            hospital: "hospial albert einstein",
            imagem: null,
        });

        await createDoctorUseCase!.execute(doc1);
        const response = await createDoctorUseCase!.execute(doc2);

        expect(response.ok).toBeFalsy();
    });

    test("not should be able create an doctor with email invalid", async () => {
        let doctorDto = {
            id: "d3b8bbbf-d91f-4c1e-a639-6f2715d60899",
            nome: "John Doe",
            apelido: "jony",
            crm: "1234567891012",
            email: "emailinvalido.com",
            hospital: "hospial albert einstein",
            imagem: null,
        };

        const response = await createDoctorUseCase!.execute(doctorDto);
        expect(response.ok).toBeFalsy();
    });
});
