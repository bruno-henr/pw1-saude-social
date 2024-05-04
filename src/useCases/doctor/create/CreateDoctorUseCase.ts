import { MediaProxy } from "../../../proxies/MediaProxy";
import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { validateEmail } from "../../../utils/validations/validateEmail";
import { ICreateDoctorDTO } from "./DTO";

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
        let result = await this.doctorRepository.save(doctor);

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
