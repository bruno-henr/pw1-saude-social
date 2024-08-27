export interface IUpdateDoctorDTO {
    id: string;
    nome?: string;
    apelido?: string;
    crm?: string;
    email?: string;
    hospital?: string;
    imagem?: string | null;
}
