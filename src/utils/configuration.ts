import path from "node:path";
import { fileConfigurationInterface, TODO } from "../types/types";
import { readFile, writeFile } from "node:fs/promises";

export enum METHODS {
    CREATE = "todo-create",
    READ = "todo-get",
    UPDATE = "todo-update",
    DELETE = "todo-delete"
}

export const const_path = (val: string) => path.join(process.cwd(), val);

export const fileConfiguration: fileConfigurationInterface = {
    async write_file(db_path: string, data: TODO[]): Promise<boolean> {
        await writeFile(db_path, JSON.stringify(data, null, 4));
        return true;
    },
    async read_file(db_path: string): Promise<TODO[]> {
        const read:string = await readFile(db_path, "utf8");
        return JSON.parse(read);
    }
}