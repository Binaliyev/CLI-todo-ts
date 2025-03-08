"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_dto_1 = require("../controllers/control.dto");
const error_1 = require("./error");
class Validation extends control_dto_1.ValidationInterface {
    constructor() {
        super();
        this.command_validation = function (command) {
            if (!command)
                throw new error_1.ClientError("Command is required", 400);
            if (!(command.startsWith("todo-")))
                throw new error_1.ClientError("Command is invalid", 400);
            return true;
        };
        this.todo_validation = function (todo_title) {
            if (!todo_title)
                throw new error_1.ClientError("Todo message is required", 400);
            // if (!(todo.id)) throw new ClientError("Todo id is requered", 400);
            // if (!(todo.user_id)) throw new ClientError("Todo user id is requered", 400);
            // if (typeof todo.id != "number") throw new ClientError("Todo id type is invalid", 400);
            // if (typeof todo.user_id != "number") throw new ClientError("Todo user id type is invalid", 400);
            return true;
        };
    }
}
exports.default = new Validation();
