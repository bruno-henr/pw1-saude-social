export class DoctorDTO {
    public id: string;
    public nome: string;
    public apelido: string;
    public crm: string;
    public email: string;
    public hospital: string;
    public imagem: string | null;

    constructor(
        id: string,
        nome: string,
        apelido: string,
        crm: string,
        email: string,
        hospital: string,
        imagem: string | null,
    ) {
        this.id = id;
        this.nome = nome;
        this.apelido = apelido;
        this.crm = crm;
        this.email = email;
        this.hospital = hospital;
        this.imagem = imagem;
    }
}
