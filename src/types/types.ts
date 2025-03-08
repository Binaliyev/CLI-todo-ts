export interface TODO {
    id?: number,
    todo_message: string,
    user_id?: number
};
export interface ErrorInterface {
    message: string,
    status: number
};

export interface fileConfigurationInterface {
    write_file: (db_path: string, data: TODO[]) => Promise<boolean>;
    read_file: (db_path: string) => Promise<TODO[]>
}

export interface ResultInerface extends ErrorInterface {
    result?: TODO
}