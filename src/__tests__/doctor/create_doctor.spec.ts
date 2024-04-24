import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { DoctorRepositoryInMemory } from '../../__in_memory__/DoctorRepositoryInMemory';
import { IDoctorRepository } from '../../repositories/interface/IDoctorRepository';
import { CreateDoctorUseCase } from '../../useCases/doctor/create/CreateDoctorUseCase';

describe('Create Doctor', () => {
    let doctorRepositoryInMemory: IDoctorRepository | null;
    let createDoctorUseCase: CreateDoctorUseCase | null;

    beforeAll(() => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        createDoctorUseCase = new CreateDoctorUseCase(doctorRepositoryInMemory);
    });
    afterAll(() => {
        createDoctorUseCase = null;
        doctorRepositoryInMemory = null;
    })

    test('should be able create an doctor', async () => {
        let doctorDto = {
            id: "d3b8bbbf-d91f-4c1e-a639-6f2715d60899",
            nome: "John Doe",
            apelido: "jony",
            crm: "1234567891012",
            email: "jhon@email.com",
            hospital: "hospial albert einstein",
            imagem: null
        };

        const response = await createDoctorUseCase?.execute(doctorDto);
        console.log('response => ', response)
        expect(response).toHaveProperty('has_error', false);
        expect(response?.data).toHaveProperty('id');
    });

    test('not should be able create an doctor with email invalid', () => {
        let doctorDto = {
            id: "d3b8bbbf-d91f-4c1e-a639-6f2715d60899",
            nome: "John Doe",
            apelido: "jony",
            crm: "1234567891012",
            email: "emailinvalido.com",
            hospital: "hospial albert einstein",
            imagem: null
        };

        expect(async () => {
            await createDoctorUseCase?.execute(doctorDto)
        }).rejects.toThrow();
    });
});