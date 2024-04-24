import { DoctorDTO } from "../../../dto/DoctorDTO";
import { MediaProxy } from "../../../proxies/MediaProxy";
import { DoctorRepository } from "../../../repositories/DoctorRepository";

export class CreateDoctorUseCase {
    constructor(
        private doctorRepository: DoctorRepository,
        private mediaProxy: MediaProxy,
    ) {}

    async execute(
        doctor: DoctorDTO,
        profileImage?: Express.Multer.File,
    ): Promise<DoctorDTO> {
        // registering the doctor
        await this.doctorRepository.save(doctor);

        // if everything was ok with the creation we save the profile image (if exists)
        if (profileImage) {
            // saving the image to firebase and getting the url
            const fileType = profileImage.mimetype.split("/")[1];
            const profileImageUrl = await this.mediaProxy.saveImage(
                profileImage.buffer,
                `/${doctor.apelido}/img/profile/${doctor.apelido}-profile-image.${fileType}`,
            );

            // updating the image profile
            await this.doctorRepository.setProfileImage(
                doctor.id,
                profileImageUrl,
            );

            doctor.imagem = profileImageUrl;
        }

        return doctor;
    }
}
