import * as bcrypt from "bcrypt";
import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { validateEmail } from "../../../utils/validations/validateEmail";
import { ILoginDTO } from "./DTO";

export class LoginUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
    ) { }

    async execute(
        data: ILoginDTO
    ): Promise<ResponseEntity> {
        if (!validateEmail(data.email)) {
            return new ResponseEntity(false, "Email is invalid.", {});
        }
        // registering the doctor
        let result = await this.doctorRepository.findByEmail(data.email);

        const doctorFound: any = result.data;
        console.log('aobaa', doctorFound.dataValues.senha)
        const senha = doctorFound.dataValues.senha;
        const passwordMatched = await bcrypt.compare(
            data.senha, 
            senha       
        );
        console.log('passwordMatched => ', passwordMatched)

        return result;
    }
}
