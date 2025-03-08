import { ResultInerface, TODO } from "../types/types";

export abstract class ValidationInterface {
    abstract command_validation: (command: string) => boolean | never;
    abstract todo_validation: (todo_title: string) => boolean | never;
    protected constructor(){};
}

export abstract class TodoControllerInterface {
    abstract todo_create: (todo_title: string) => Promise<ResultInerface | void>;
    abstract todo_read: (id?:string | undefined) => Promise<TODO | TODO[] | void>;
    abstract todo_update: (todo_title: string, todo_id: string) => Promise<ResultInerface | void>;
    abstract todo_delete: (id: string) => Promise<ResultInerface | void>;
    protected constructor(){};
}