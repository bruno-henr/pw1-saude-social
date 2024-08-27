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

    async deleteStorage(username: string): Promise<void> {
        await bucket.deleteFiles({ prefix: `${username}/` });
    }

    async deleteFile(filePath: string): Promise<void> {
        const file = bucket.file(filePath);
        await file.delete();
    }
}
