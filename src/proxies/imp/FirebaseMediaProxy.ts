import { bucket } from "../../config/firebaseConfig";
import { MediaProxy } from "../MediaProxy";

export class FirebaseMediaProxy implements MediaProxy {
    async saveImage(buffer: Buffer, filePath: string): Promise<string> {
        const file = bucket.file(filePath);
        await file.save(buffer);
        // alwogin anyone to see
        await file.makePublic();
        const url = file.publicUrl();
        return url;
    }
}
