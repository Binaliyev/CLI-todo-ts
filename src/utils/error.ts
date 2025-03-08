import { ErrorInterface } from "../types/types";

export class ClientError extends Error {
    status: number
    constructor(message: string, status: number) {
        super(message);
        this.message = `ClientError: ${message}`;
        this.status = status;
    }
}

export class TodoError extends Error {
    status: number
    constructor(message: string) {
        super(message);
        this.message = `TodoError: ${message}`;
        this.status = 500;
    }
}

export const GlobalError = (err:ErrorInterface): void => {
    const error: ErrorInterface = {
        message: err.message,
        status: err.status
    }
    return console.log(error);
}