"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const validation_1 = __importDefault(require("../utils/validation"));
const control_dto_1 = require("./control.dto");
const configuration_1 = require("../utils/configuration");
const database_path = (0, configuration_1.const_path)("db/todo.json");
let todos = configuration_1.fileConfiguration.read_file(database_path);
class TodoController extends control_dto_1.TodoControllerInterface {
    constructor() {
        super();
        this.todo_create = function (todo_title) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    todo_title = todo_title.trim().toLowerCase();
                    validation_1.default.todo_validation(todo_title);
                    todos = yield todos;
                    const todo = {
                        id: todos.length ? ((_a = todos.at(-1)) === null || _a === void 0 ? void 0 : _a.id) + 1 : 1,
                        todo_message: todo_title,
                        user_id: 1
                    };
                    todos.push(todo);
                    let write = yield configuration_1.fileConfiguration.write_file(database_path, todos);
                    if (!write)
                        throw new error_1.TodoError("Todo is not saved");
                    const result = {
                        message: "Todo is success full saved",
                        status: 201,
                        result: todo
                    };
                    return result;
                }
                catch (error) {
                    return (0, error_1.GlobalError)(error);
                }
            });
        };
        this.todo_read = function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (id) {
                        if (!Number(id))
                            throw new error_1.ClientError("ID is invalid", 400);
                        todos = (yield todos);
                        const find_index_todo = todos.findIndex((t) => t.id == Number(id));
                        if (find_index_todo == -1)
                            throw new error_1.ClientError("NOT FOUND !!!", 404);
                        return todos[find_index_todo];
                    }
                    ;
                    if (!id)
                        return (yield todos);
                }
                catch (error) {
                    return (0, error_1.GlobalError)(error);
                }
            });
        };
        this.todo_update = function (todo_title, todo_id) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!todo_id)
                        throw new error_1.ClientError("ID is required", 400);
                    if (!Number(todo_id))
                        throw new error_1.ClientError("ID is invalid", 400);
                    validation_1.default.todo_validation(todo_title);
                    todos = (yield todos);
                    const find_index_todo = todos.findIndex((t) => t.id == Number(todo_id));
                    if (find_index_todo == -1)
                        throw new error_1.ClientError("NOT FOUND !!!", 404);
                    const todo = todos[find_index_todo];
                    todo.id = Number(todo_id);
                    todo.todo_message = todo_title;
                    todo.user_id = 1;
                    let write = yield configuration_1.fileConfiguration.write_file(database_path, todos);
                    if (!write)
                        throw new error_1.TodoError("Todo is not saved");
                    const result = {
                        message: "Todo is success edited",
                        status: 200,
                        result: todo
                    };
                    return result;
                }
                catch (error) {
                    return (0, error_1.GlobalError)(error);
                }
            });
        };
        this.todo_delete = function (id) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!id)
                        throw new error_1.ClientError("ID is required", 400);
                    if (!Number(id))
                        throw new error_1.ClientError("ID is invalid", 400);
                    todos = (yield todos);
                    const find_index_todo = todos.findIndex((t) => t.id == Number(id));
                    if (find_index_todo == -1)
                        throw new error_1.ClientError("NOT FOUND !!!", 404);
                    todos.splice(find_index_todo, 1);
                    let write = yield configuration_1.fileConfiguration.write_file(database_path, todos);
                    if (!write)
                        throw new error_1.TodoError("Todo is not saved");
                    const result = {
                        message: "Todo is success deleted",
                        status: 200,
                    };
                    return result;
                }
                catch (error) {
                    return (0, error_1.GlobalError)(error);
                }
            });
        };
    }
}
exports.default = new TodoController();
