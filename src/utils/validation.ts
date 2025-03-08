import { ValidationInterface } from "../controllers/control.dto";
import { ClientError } from "./error";

class Validation extends ValidationInterface {
    command_validation: (command: string) => boolean | never;
    todo_validation: (todo_title:string) => boolean | never;
    constructor() {
        super();
        this.command_validation = function (command: string): boolean | never {
            if (!command) throw new ClientError("Command is required", 400);
            if (!(command.startsWith("todo-"))) throw new ClientError("Command is invalid", 400);
            return true;
        };
        this.todo_validation = function (todo_title: string): boolean | never {
            if (!todo_title) throw new ClientError("Todo message is required", 400);
            // if (!(todo.id)) throw new ClientError("Todo id is requered", 400);
            // if (!(todo.user_id)) throw new ClientError("Todo user id is requered", 400);
            // if (typeof todo.id != "number") throw new ClientError("Todo id type is invalid", 400);
            // if (typeof todo.user_id != "number") throw new ClientError("Todo user id type is invalid", 400);
            return true;
        };
    }
}

export default new Validation()