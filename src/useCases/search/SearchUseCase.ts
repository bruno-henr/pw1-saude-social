import { IDoctorRepository } from "../../repositories/interface/IDoctorRepository";
import { IPostRepository } from "../../repositories/interface/IPostRepository";
import { DoctorModel } from "../../model/imp/sequelize/DoctorModel";
import { PostModel } from "../../model/imp/sequelize/PostModel";

export class SearchUseCase {
    constructor(
        private doctorRepository: IDoctorRepository,
        private postRepository: IPostRepository,
    ) { }

    async execute(query: string): Promise<{ doctors: DoctorModel[], posts: PostModel[] }> {
        console.log('ESSA PORRA +> ', query)
        let doctors = await this.doctorRepository.findMedic({ nome: query });
        let posts = await this.postRepository.listPosts({ conteudo: query });

        return {
            doctors: doctors.data as DoctorModel[],
            posts: posts.data as PostModel[]
        };
    }
}
