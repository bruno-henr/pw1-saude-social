export interface MediaProxy {
    /**
     * Receives a data(blob) and a filePath and try to save the file into
     * media proxy
     * @param data the file data itself
     * @param filePath the filePath
     */
    saveImage(data: Buffer, filePath: string): Promise<string>;
}
