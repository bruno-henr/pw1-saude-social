export class Response {
    public data: any;
    public has_error: boolean = false;
    public error: string = "";

    constructor(data?: any, has_error?: boolean, error?: string) {
        Object.assign(this, { data, has_error, error })
    }
}
