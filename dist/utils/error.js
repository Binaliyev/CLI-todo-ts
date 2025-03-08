"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalError = exports.TodoError = exports.ClientError = void 0;
class ClientError extends Error {
    constructor(message, status) {
        super(message);
        this.message = `ClientError: ${message}`;
        this.status = status;
    }
}
exports.ClientError = ClientError;
class TodoError extends Error {
    constructor(message) {
        super(message);
        this.message = `TodoError: ${message}`;
        this.status = 500;
    }
}
exports.TodoError = TodoError;
const GlobalError = (err) => {
    const error = {
        message: err.message,
        status: err.status
    };
    return console.log(error);
};
exports.GlobalError = GlobalError;
