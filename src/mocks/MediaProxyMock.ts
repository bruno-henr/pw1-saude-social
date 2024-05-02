import { MediaProxy } from "../proxies/MediaProxy";

export class MediaProxyMock implements MediaProxy {
    async saveImage(data: Buffer, filePath: string): Promise<string> {
        return filePath;
    }
}
