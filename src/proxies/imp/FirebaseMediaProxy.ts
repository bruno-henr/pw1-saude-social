import { bucket } from "../../config/firebaseConfig";
import { MediaProxy } from "../MediaProxy";

export class FirebaseMediaProxy implements MediaProxy {
    async saveImage(buffer: Buffer, filename: string): Promise<string> {
        const file = bucket.file(filename);
        await file.save(buffer);
        // alwogin anyone to see
        await file.makePublic();
        const url = file.publicUrl();
        return url;
    }
}
