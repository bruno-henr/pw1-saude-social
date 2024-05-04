import { IDoctorDTO } from "../../../dto/IDoctorDto";
import { MediaProxy } from "../../../proxies/MediaProxy";
import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";

export class DeleteDoctorUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
        private mediaProxy: MediaProxy,
    ) {}

    async execute(doctorId: string): Promise<ResponseEntity> {
        // deleting the profile image
        const response = await this.doctorRepository.findByPk(doctorId);

        if (!response.ok) throw new Error("Doctor Not Found!");

        const doctor = response.data as IDoctorDTO;
        await this.mediaProxy.deleteStorage(doctor.apelido);

        // removing from postgres
        const result = await this.doctorRepository.delete(doctorId);
        return result;
    }
}
