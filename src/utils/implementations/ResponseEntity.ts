export class ResponseEntity<T extends Object = any> {
    public ok: boolean;
    public message: string;
    public data: Object;

    constructor(ok: boolean, message: string, data: T) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }
}
