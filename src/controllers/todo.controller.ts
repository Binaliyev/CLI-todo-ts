import { readFile, writeFile } from "node:fs/promises";
import { ErrorInterface, ResultInerface, TODO } from "../types/types";
import { ClientError, GlobalError, TodoError } from "../utils/error";
import validation from "../utils/validation";
import { TodoControllerInterface } from "./control.dto";
import { const_path, fileConfiguration } from "../utils/configuration";
const database_path: string = const_path("db/todo.json");
let todos: Promise<TODO[]> | TODO[] = fileConfiguration.read_file(database_path);
class TodoController extends TodoControllerInterface {
    todo_create: (todo_title: string) => Promise<ResultInerface | void>;
    todo_read: (id?: string | undefined) => Promise<TODO | TODO[] | void>;
    todo_update: (todo_title: string, todo_id: string) => Promise<ResultInerface | void>;
    todo_delete: (id: string) => Promise<ResultInerface | void>;
    constructor() {
        super();
        this.todo_create = async function (todo_title: string): Promise<ResultInerface | void> {
            try {
                todo_title = todo_title.trim().toLowerCase();
                validation.todo_validation(todo_title);
                todos = await todos;
                const todo: TODO = {
                    id: todos.length ? todos.at(-1)?.id! + 1 : 1,
                    todo_message: todo_title,
                    user_id: 1
                };
                todos.push(todo);
                let write: boolean = await fileConfiguration.write_file(database_path, todos);
                if (!write) throw new TodoError("Todo is not saved");
                const result: ResultInerface = {
                    message: "Todo is success full saved",
                    status: 201,
                    result: todo
                }
                return result;
            } catch (error) {
                return GlobalError(error as ErrorInterface)
            }
        };
        this.todo_read = async function (id?: string | undefined): Promise<TODO | TODO[] | void> {
            try {
                if (id) {
                    if (!Number(id)) throw new ClientError("ID is invalid", 400);
                    todos = (await todos);
                    const find_index_todo: number = todos.findIndex((t: TODO) => t.id == Number(id));
                    if (find_index_todo == -1) throw new ClientError("NOT FOUND !!!", 404);
                    return todos[find_index_todo];
                };
                if (!id) return (await todos);
            } catch (error) {
                return GlobalError(error as ErrorInterface)
            }
        };
        this.todo_update = async function (todo_title: string, todo_id: string): Promise<ResultInerface | void> {
            try {
                if (!todo_id) throw new ClientError("ID is required", 400);
                if (!Number(todo_id)) throw new ClientError("ID is invalid", 400);
                validation.todo_validation(todo_title);
                todos = (await todos);
                const find_index_todo: number = todos.findIndex((t: TODO) => t.id == Number(todo_id));
                if (find_index_todo == -1) throw new ClientError("NOT FOUND !!!", 404);
                const todo: TODO = todos[find_index_todo];
                todo.id = Number(todo_id);
                todo.todo_message = todo_title;
                todo.user_id = 1;
                let write: boolean = await fileConfiguration.write_file(database_path, todos);
                if (!write) throw new TodoError("Todo is not saved");
                const result: ResultInerface = {
                    message: "Todo is success edited",
                    status: 200,
                    result: todo
                }
                return result;
            } catch (error) {
                return GlobalError(error as ErrorInterface);
            }
        };
        this.todo_delete = async function (id: string): Promise<ResultInerface | void> {
            try {
                if (!id) throw new ClientError("ID is required", 400);
                if (!Number(id)) throw new ClientError("ID is invalid", 400);
                todos = (await todos);
                const find_index_todo: number = todos.findIndex((t: TODO) => t.id == Number(id));
                if (find_index_todo == -1) throw new ClientError("NOT FOUND !!!", 404);
                todos.splice(find_index_todo, 1);
                let write: boolean = await fileConfiguration.write_file(database_path, todos);
                if (!write) throw new TodoError("Todo is not saved");
                const result: ResultInerface = {
                    message: "Todo is success deleted",
                    status: 200,
                }
                return result;
            } catch (error) {
                return GlobalError(error as ErrorInterface)
            }
        }
    }
}

export default new TodoController();