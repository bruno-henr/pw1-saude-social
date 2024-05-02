import { MediaProxy } from "../../../proxies/MediaProxy";
import { IPostRepository } from "../../../repositories/interface/IPostRepository";
import { ResponseEntity } from "../../../utils/implementations/ResponseEntity";
import { ICreatePostDTO } from "./DTO";

export class CreatePostUseCase {
    constructor(
        private postRepository: IPostRepository,
        private mediaProxy: MediaProxy,
    ) {}

    async execute(
        data: ICreatePostDTO,
        profileImage?: Express.Multer.File,
    ): Promise<ResponseEntity> {
        const result = await this.postRepository.save(data);
        if (!result.ok) return result;

        // if everything was ok with the creation we save the profile image (if exists)
        if (profileImage) {
            // saving the image to firebase and getting the url
            const fileType = profileImage.mimetype.split("/")[1];
            // const profileImageUrl = await this.mediaProxy.saveImage(
            //     profileImage.buffer,
            //     `/${result.data.id}/img/profile/${doctor.apelido}-profile-image.${fileType}`,
            // );

            // updating the image profile
            // await this.doctorRepository.setProfileImage(
            //     doctor.id,
            //     profileImageUrl,
            // );

            // doctor.imagem = profileImageUrl;
        }

        return result;
    }
}
