import { log } from "console";
import { ErrorInterface } from "./types/types";
import { GlobalError } from "./utils/error";
import validation from "./utils/validation";
import { METHODS } from "./utils/configuration";
import todoController from "./controllers/todo.controller";

const TodoRequestControlFn = async (arg: string[]): Promise<void> => {
    try {
        validation.command_validation(arg[2]);
        const command: string = arg[2];
        if (command == METHODS.CREATE) return log(await todoController.todo_create(arg[3]));
        if (command == METHODS.READ) return log(await todoController.todo_read(arg[3]));
        if (command == METHODS.UPDATE) return log(await todoController.todo_update(arg[4], arg[3]));
        if (command == METHODS.DELETE) return log(await todoController.todo_delete(arg[3]));
    } catch (error) {
        return GlobalError(error as ErrorInterface)
    }
}
TodoRequestControlFn(process.argv);