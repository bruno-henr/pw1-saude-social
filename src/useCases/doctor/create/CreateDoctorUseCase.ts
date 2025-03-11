import { MediaProxy } from "../../../proxies/MediaProxy";
import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { validateEmail } from "../../../utils/validations/validateEmail";
import { ICreateDoctorDTO } from "./DTO";
import * as bcrypt from "bcrypt";

export class CreateDoctorUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
        private mediaProxy: MediaProxy,
    ) {}

    async execute(
        doctor: ICreateDoctorDTO,
        profileImage?: Express.Multer.File,
    ): Promise<ResponseEntity> {
        if (!validateEmail(doctor.email)) {
            return new ResponseEntity(false, "Email is invalid.", {});
        }
        // registering the doctor
        const hashedPassword = await bcrypt.hash(doctor.senha, 7);
        let result = await this.doctorRepository.save({
            ...doctor,
            senha: hashedPassword
        });

        // if everything was ok with the creation we save the profile image (if exists)
        if (profileImage && result.ok) {
            // saving the image to firebase and getting the url
            const fileType = profileImage.mimetype.split("/")[1];
            const profileImageUrl = await this.mediaProxy.saveImage(
                profileImage.buffer,
                `${doctor.apelido}/img/profile/${doctor.apelido}-profile-image.${fileType}`,
            );

            // updating the image profile
            result = await this.doctorRepository.setProfileImage(
                doctor.nome,
                profileImageUrl,
            );

            doctor.imagem = profileImageUrl;
        }

        return result;
    }
}
