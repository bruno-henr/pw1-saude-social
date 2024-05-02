import { MediaProxy } from "../../../proxies/MediaProxy";
import { IDoctorRepository } from "../../../repositories/interface/IDoctorRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { validateEmail } from "../../../utils/validations/validateEmail";
import { IUpdateDoctorDTO } from "./DTO";

export class UpdateDoctorService {
    constructor(
        private doctorRepository: IDoctorRepository,
        private mediaProxy: MediaProxy,
    ) {}

    async execute(
        doctor: IUpdateDoctorDTO,
        profileImage?: Express.Multer.File,
    ): Promise<ResponseEntity> {
        if (!validateEmail(doctor.email)) {
            throw new Error("Email is invalid.");
        }

        // updating the doctor
        let result = await this.doctorRepository.updateOne(doctor);

        // if image was passed
        if (profileImage && result.ok) {
            // saving the image to firebase and getting the url
            const fileType = profileImage.mimetype.split("/")[1];
            const profileImageUrl = await this.mediaProxy.saveImage(
                profileImage.buffer,
                `/${doctor.apelido}/img/profile/${doctor.apelido}-profile-image.${fileType}`,
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
