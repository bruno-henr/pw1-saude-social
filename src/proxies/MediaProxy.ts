export interface MediaProxy {
    /**
     * Receives a data(blob) and a filename and try to save the file into
     * media proxy
     * @param data the file data itself
     * @param filename the filename
     */
    saveImage(data: Buffer, filename: string): Promise<string>;
}
