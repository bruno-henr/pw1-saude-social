export interface ICreateDoctorDTO {
    nome: string;
    apelido: string;
    crm: string;
    email: string;
    hospital: string;
    imagem?: string | null;
}
