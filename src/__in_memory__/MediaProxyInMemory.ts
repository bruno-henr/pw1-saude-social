import { MediaProxy } from "../proxies/MediaProxy";

class MediaProxyInMemory implements MediaProxy {
    async saveImage(data: Buffer, filePath: string): Promise<string> {
        return "";
    }
}

export { MediaProxyInMemory };
