import { ResponseEntity } from "../../utils/implementations/ResponseEntity";

export interface IFilesRepository {
    save(data: any): Promise<ResponseEntity>;
    update(data: any): Promise<ResponseEntity>;
    list(queries: any): Promise<ResponseEntity>;
    delete(id: string): Promise<ResponseEntity>;
}
