import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { IGetDoctorDTO } from "./DTO";

export class GetDoctorUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
    ) { }

    async execute(
        doctor: IGetDoctorDTO
    ): Promise<ResponseEntity> {
        let queries = {} as IGetDoctorDTO;
        if(!!doctor.crm && !!doctor.id) {
            queries = doctor
        } else if(!!doctor.crm) { queries.crm = doctor.crm } 
        else if(!!doctor.id) {
            queries.id = doctor.id
        } 
        
        let result = await this.doctorRepository.list(queries);
        return result;
    }
}
