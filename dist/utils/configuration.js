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
exports.fileConfiguration = exports.const_path = exports.METHODS = void 0;
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = require("node:fs/promises");
var METHODS;
(function (METHODS) {
    METHODS["CREATE"] = "todo-create";
    METHODS["READ"] = "todo-get";
    METHODS["UPDATE"] = "todo-update";
    METHODS["DELETE"] = "todo-delete";
})(METHODS || (exports.METHODS = METHODS = {}));
const const_path = (val) => node_path_1.default.join(process.cwd(), val);
exports.const_path = const_path;
exports.fileConfiguration = {
    write_file(db_path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, promises_1.writeFile)(db_path, JSON.stringify(data, null, 4));
            return true;
        });
    },
    read_file(db_path) {
        return __awaiter(this, void 0, void 0, function* () {
            const read = yield (0, promises_1.readFile)(db_path, "utf8");
            return JSON.parse(read);
        });
    }
};
