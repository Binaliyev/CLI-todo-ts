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
const console_1 = require("console");
const error_1 = require("./utils/error");
const validation_1 = __importDefault(require("./utils/validation"));
const configuration_1 = require("./utils/configuration");
const todo_controller_1 = __importDefault(require("./controllers/todo.controller"));
const TodoRequestControlFn = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validation_1.default.command_validation(arg[2]);
        const command = arg[2];
        if (command == configuration_1.METHODS.CREATE)
            return (0, console_1.log)(yield todo_controller_1.default.todo_create(arg[3]));
        if (command == configuration_1.METHODS.READ)
            return (0, console_1.log)(yield todo_controller_1.default.todo_read(arg[3]));
        if (command == configuration_1.METHODS.UPDATE)
            return (0, console_1.log)(yield todo_controller_1.default.todo_update(arg[4], arg[3]));
        if (command == configuration_1.METHODS.DELETE)
            return (0, console_1.log)(yield todo_controller_1.default.todo_delete(arg[3]));
    }
    catch (error) {
        return (0, error_1.GlobalError)(error);
    }
});
TodoRequestControlFn(process.argv);
