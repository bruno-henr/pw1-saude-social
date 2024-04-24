import { DoctorDTO } from "../dto/DoctorDTO";
import { Doctor } from "../model/Doctor";

export interface DoctorRepository {
    /**
     * Receives a doctor data transfer object and save it
     * @param doctor Doctor DTO
     */
    save(doctor: DoctorDTO): Promise<void>;

    /**
     * Receives Doctor's primary key and tries to find the row. If the doctor is not found,
     * it'll throw a Error
     *
     * @param pk Primary Key
     * @throws Doctor Not Found
     */
    findByPk(pk: string): Promise<Doctor | null>;

    /**
     * Receives a username and tries to find the user
     * @param username Apelido
     */
    findByUsername(username: string): Promise<Doctor | null>;

    /**
     * Recieves the docto's pk and the image url that must be saved and set the url into
     * the tuple containing the passed pk
     * @param pk Primary Key
     * @param imageUrl Image URL
     */
    setProfileImage(pk: string, imageUrl: string): Promise<void>;
}
